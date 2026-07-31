import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {foundry.applications.sheets.ActorSheetV2}
 */
export class EdgelinerRPGActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['edgeliner-rpg', 'sheet', 'actor'],
    position: {
      width: 800,
      height: 800,
    },
    window: {
      resizable: true,
    },
    form: {
      submitOnChange: true,
      closeOnSubmit: false,
    },
  };

  /** @override */
  _configureRenderParts(options) {
    const parts = super._configureRenderParts(options);
    parts.form = {
      template: `systems/edgeliner-rpg/templates/actor/actor-${this.actor.type}-sheet.hbs`,
      root: true,
    };
    return parts;
  }

  /* -------------------------------------------- */

  /** @override */
  async _onDropItem(event, item) {
    if (item.type === 'hindrance' && this.actor.uuid !== item.parent?.uuid) {
      const currentPoints = this.actor.items
        .filter((i) => i.type === 'hindrance')
        .reduce((sum, i) => sum + (i.system.isSignificant ? 2 : 1), 0);
      const newPoints = item.system.isSignificant ? 2 : 1;
      if (currentPoints + newPoints > 4) {
        ui.notifications.warn(
          `Cannot add "${item.name}": hindrance limit is 4 points (currently ${currentPoints}/4).`
        );
        return null;
      }
    }

    const isExternalDrop = this.actor.uuid !== item.parent?.uuid;
    if (item.type === 'ancestry' && isExternalDrop) {
      // Only one Ancestry at a time; dropping a new one replaces the old one and
      // rolls back the ability bonus it granted.
      const existing = this.actor.items.find((i) => i.type === 'ancestry');
      if (existing) {
        await this._removeAncestryFreeAbility(existing);
        await existing.delete();
        ui.notifications.info(`Replaced Ancestry "${existing.name}" with "${item.name}".`);
      }
    }

    const result = await super._onDropItem(event, item);
    if (result && item.type === 'ancestry' && isExternalDrop) {
      await this._applyAncestryFreeAbility(result);
    }
    return result;
  }

  /**
   * An Ancestry grants a free increase (to d10+2) for its chosen ability, but only if
   * that ability hasn't already been improved past the base d12+0 tier.
   */
  async _applyAncestryFreeAbility(ancestryItem) {
    const ability = ancestryItem.system.freeAbility;
    const current = this.actor.system.abilities[ability];
    if (current.die === 'd12') {
      await this.actor.update({
        [`system.abilities.${ability}.die`]: 'd10',
        [`system.abilities.${ability}.bonus`]: 2,
      });
    }
  }

  /**
   * Losing an Ancestry (deleted, or replaced by a new one) lowers its granted ability by
   * one die step from wherever it currently sits - undoing the free increase even if the
   * ability was improved further afterward - rather than resetting it outright.
   */
  async _removeAncestryFreeAbility(ancestryItem) {
    const ability = ancestryItem.system.freeAbility;
    const current = this.actor.system.abilities[ability];
    const ladder = ['d4', 'd6', 'd8', 'd10', 'd12'];
    const bonusByDie = { d4: 8, d6: 6, d8: 4, d10: 2, d12: 0 };
    const index = ladder.indexOf(current.die);
    if (index === -1 || index === ladder.length - 1) return;
    const newDie = ladder[index + 1];
    await this.actor.update({
      [`system.abilities.${ability}.die`]: newDie,
      [`system.abilities.${ability}.bonus`]: bonusByDie[newDie],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = await super._prepareContext(options);

    // Use a safe clone of the actor data for further operations.
    const actorData = this.document.toPlainObject();

    // Add the actor's data to context for easier access, as well as flags.
    context.actor = this.actor;
    context.cssClass = this.options.classes.join(' ');
    context.system = actorData.system;
    context.flags = actorData.flags;
    context.items = actorData.items.sort((a, b) => (a.sort || 0) - (b.sort || 0));

    // Adding a pointer to CONFIG.EDGELINER_RPG
    context.config = CONFIG.EDGELINER_RPG;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Enrich biography info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedBiography = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.actor.system.biography,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.actor.getRollData(),
        // Relative UUID resolution
        relativeTo: this.actor,
      }
    );

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Character-specific context modifications
   *
   * @param {object} context The context object to mutate
   */
  _prepareCharacterData(context) {
    // This is where you can enrich character-specific editor fields
    // or setup anything else that's specific to this type
  }

  /**
   * Organize and classify Items for Actor sheets.
   *
   * @param {object} context The context object to mutate
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const hindrances = [];
    const talents = [];
    const ancestries = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to hindrances.
      else if (i.type === 'hindrance') {
        hindrances.push(i);
      }
      // Append to talents.
      else if (i.type === 'talent') {
        talents.push(i);
      }
      // Append to ancestries.
      else if (i.type === 'ancestry') {
        ancestries.push(i);
      }
    }

    // Assign and return
    context.gear = gear;
    context.ancestry = ancestries[0] ?? null;
    context.hindrances = hindrances.sort((a, b) => a.name.localeCompare(b.name));
    context.hindrancePoints = hindrances.reduce(
      (sum, h) => sum + (h.system.isSignificant ? 2 : 1),
      0
    );
    context.talents = talents.sort((a, b) => a.name.localeCompare(b.name));
    context.talentCount = talents.length;
    context.talentMax = 1 + Math.floor(context.hindrancePoints / 2);
  }

  /* -------------------------------------------- */

  /** @override */
  async _onRender(context, options) {
    await super._onRender(context, options);

    const html = $(this.element);

    // _onRender fires on every re-render (e.g. every actor.update()), and jQuery's .on()
    // stacks handlers rather than replacing them. Without this, every delegated listener
    // registered below would multiply on each render, firing N times per click/change.
    html.off('.edgelinerrpg');

    // Sheet tab navigation (ApplicationV2 has no declarative `tabs` option,
    // so switching is handled manually here, same markup as before).
    // The active tab is tracked on the instance because every actor.update()
    // triggers a fresh _onRender, which would otherwise reset to the default tab.
    this._activeTabs ??= {};
    html.on('click.edgelinerrpg', '.sheet-tabs a[data-tab]', (ev) => {
      ev.preventDefault();
      const group = ev.currentTarget.closest('.sheet-tabs')?.dataset.group;
      const tab = ev.currentTarget.dataset.tab;
      const nav = $(ev.currentTarget).closest('.sheet-tabs');
      nav.find('a').removeClass('active');
      html.find(`.sheet-body > .tab[data-group="${group}"]`).removeClass('active');
      $(ev.currentTarget).addClass('active');
      html.find(`.sheet-body > .tab[data-group="${group}"][data-tab="${tab}"]`).addClass('active');
      this._activeTabs[group] = tab;
    });
    html.find('.sheet-tabs').each((i, nav) => {
      const $nav = $(nav);
      const group = nav.dataset.group;
      const defaultTab = group === 'frontpage' ? 'abilities' : 'description';
      const initial = this._activeTabs[group] ?? defaultTab;
      this._activeTabs[group] = initial;
      $nav.find('a').removeClass('active');
      $nav.find(`a[data-tab="${initial}"]`).addClass('active');
      html.find(`.sheet-body > .tab[data-group="${group}"]`).removeClass('active');
      html.find(`.sheet-body > .tab[data-group="${group}"][data-tab="${initial}"]`).addClass('active');
    });

    // Restore each tab's scroll position after a re-render (e.g. from actor.update()),
    // and keep tracking it live so the next re-render can restore it again.
    this._scrollPositions ??= {};
    html.find('.sheet-body > .tab').each((i, tabEl) => {
      const key = `${tabEl.dataset.group}:${tabEl.dataset.tab}`;
      tabEl.scrollTop = this._scrollPositions[key] || 0;
      tabEl.addEventListener('scroll', () => {
        this._scrollPositions[key] = tabEl.scrollTop;
      });
    });

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click.edgelinerrpg', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click.edgelinerrpg', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click.edgelinerrpg', '.item-delete', async (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));

      if (item.type === 'ancestry') {
        await this._removeAncestryFreeAbility(item);
      }

      await item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click.edgelinerrpg', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click.edgelinerrpg', '.rollable', this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }

    // Ability score increase/decrease.
    html.on('click.edgelinerrpg', '.increase-ability', this._onIncreaseAbility.bind(this));
    html.on('click.edgelinerrpg', '.decrease-ability', this._onDecreaseAbility.bind(this));
    // Skill value increase/decrease.
    html.on('click.edgelinerrpg', '.increase-skill', this._onIncreaseSkill.bind(this));
    html.on('click.edgelinerrpg', '.decrease-skill', this._onDecreaseSkill.bind(this));

    // Toggle whether a piece of armor is currently worn.
    html.on('change.edgelinerrpg', '.armor-worn', async (ev) => {
      const itemId = ev.currentTarget.dataset.itemId;
      const item = this.actor.items.get(itemId);
      if (item) await item.update({ 'system.armor.worn': ev.currentTarget.checked });
    });

    // Degrade the armor usage die by one step.
    html.on('click.edgelinerrpg', '.decrease-armor-usage', this._onDecreaseArmorUsage.bind(this));
    // Reset the armor usage die back to its full size.
    html.on('click.edgelinerrpg', '.armor-repair', async (ev) => {
      ev.preventDefault();
      await this.actor.update({ 'system.armorUsage.currentDie': this.actor.system.armorUsage.maxDie });
    });
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  //this._onIncreaseAbility.bind(this)
  async _onIncreaseAbility(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const ability = element.dataset.ability;
    const actorData = this.actor.system;
    const currentDie = actorData.abilities[ability].die;
    const currentBonus = actorData.abilities[ability].bonus;
    const hindranceMod = actorData.abilities[ability].hindranceMod;
    const traitMod = actorData.abilities[ability].traitMod;
    const cyberMod = actorData.abilities[ability].cyberMod;
    let newDie = '';
    let newBonus = 0;
    if(currentDie === 'd12') {
      newDie = 'd10';
      newBonus = 2;
    } else if(currentDie === 'd10') {
      newDie = 'd8';
      newBonus = 4;
    } else if(currentDie === 'd8') {
      newDie = 'd6';
      newBonus = 6;
    } else if(currentDie === 'd6') {
      newDie = 'd4';
      newBonus = 8;
    } else {
      newDie = currentDie;
      newBonus = currentBonus;
    }
    await this.actor.update({
      [`system.abilities.${ability}.die`]: newDie,
      [`system.abilities.${ability}.bonus`]: newBonus,
    });
  }

  //this._onDecreaseAbility.bind(this)
  async _onDecreaseAbility(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const ability = element.dataset.ability;
    const actorData = this.actor.system;
    const currentDie = actorData.abilities[ability].die;
    const currentBonus = actorData.abilities[ability].bonus;

    // An Ancestry's free ability increase can't be decreased back below d10+2.
    const ancestry = this.actor.items.find((i) => i.type === 'ancestry');
    const floorDie = ancestry?.system.freeAbility === ability ? 'd10' : 'd12';
    if (currentDie === floorDie) return;

    let newDie = '';
    let newBonus = 0;
    if(currentDie === 'd4') {
      newDie = 'd6';
      newBonus = 6;
    } else if(currentDie === 'd6') {
      newDie = 'd8';
      newBonus = 4;
    } else if(currentDie === 'd8') {
      newDie = 'd10';
      newBonus = 2;
    } else if(currentDie === 'd10') {
      newDie = 'd12';
      newBonus = 0;
    } else {
      newDie = currentDie;
      newBonus = currentBonus;
    }
    await this.actor.update({
      [`system.abilities.${ability}.die`]: newDie,
      [`system.abilities.${ability}.bonus`]: newBonus,
    });
  }

  async _onIncreaseSkill(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const category = element.dataset.category;
    const skill = element.dataset.skill;
    const currentValue = this.actor.system[category][skill].value;
    const newValue = Math.min(6, currentValue + 1);
    await this.actor.update({
      [`system.${category}.${skill}.value`]: newValue,
    });
  }

  async _onDecreaseSkill(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const category = element.dataset.category;
    const skill = element.dataset.skill;
    const currentValue = this.actor.system[category][skill].value;
    const newValue = Math.max(0, currentValue - 1);
    await this.actor.update({
      [`system.${category}.${skill}.value`]: newValue,
    });
  }

  async _onDecreaseArmorUsage(event) {
    event.preventDefault();
    const ladder = ['d12', 'd10', 'd8', 'd6', 'd4', 'd2', 'd0'];
    const current = this.actor.system.armorUsage.currentDie;
    const index = ladder.indexOf(current);
    const newDie = index === -1 ? current : ladder[Math.min(index + 1, ladder.length - 1)];
    await this.actor.update({
      'system.armorUsage.currentDie': newDie,
    });
  }

}
