import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {foundry.applications.sheets.ItemSheetV2}
 */
export class EdgelinerRPGItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['edgeliner-rpg', 'sheet', 'item'],
    position: {
      width: 520,
      height: 480,
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
      template: `systems/edgeliner-rpg/templates/item/item-${this.item.type}-sheet.hbs`,
      root: true,
    };
    return parts;
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Use a safe clone of the item data for further operations.
    const itemData = this.document.toPlainObject();

    // Enrich description info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.item.system.description,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.item.getRollData(),
        // Relative UUID resolution
        relativeTo: this.item,
      }
    );

    // Add the item's data to context for easier access, as well as flags.
    context.item = this.item;
    context.cssClass = this.options.classes.join(' ');
    context.system = itemData.system;
    context.flags = itemData.flags;

    // Adding a pointer to CONFIG.EDGELINER_RPG
    context.config = CONFIG.EDGELINER_RPG;

    // Prepare active effects for easier access
    context.effects = prepareActiveEffectCategories(this.item.effects);

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  async _onRender(context, options) {
    await super._onRender(context, options);

    const html = $(this.element);

    // _onRender fires on every re-render (e.g. every item.update()), and jQuery's .on()
    // stacks handlers rather than replacing them. Without this, every delegated listener
    // registered below would multiply on each render, firing N times per click.
    html.off('.edgelinerrpg');

    // Sheet tab navigation (ApplicationV2 has no declarative `tabs` option,
    // so switching is handled manually here, same markup as before).
    // The active tab is tracked on the instance because every item.update()
    // triggers a fresh _onRender, which would otherwise reset to the default tab.
    this._activeTab ??= 'description';
    html.on('click.edgelinerrpg', '.sheet-tabs a[data-tab]', (ev) => {
      ev.preventDefault();
      const tab = ev.currentTarget.dataset.tab;
      html.find('.sheet-tabs a').removeClass('active');
      html.find('.sheet-body > .tab').removeClass('active');
      $(ev.currentTarget).addClass('active');
      html.find(`.sheet-body > .tab[data-tab="${tab}"]`).addClass('active');
      this._activeTab = tab;
    });
    html.find('.sheet-tabs a').removeClass('active');
    html.find('.sheet-body > .tab').removeClass('active');
    html.find(`.sheet-tabs a[data-tab="${this._activeTab}"]`).addClass('active');
    html.find(`.sheet-body > .tab[data-tab="${this._activeTab}"]`).addClass('active');

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.

    // Active Effect management
    html.on('click.edgelinerrpg', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );

    html.on('click.edgelinerrpg', '.increase-gear', async (ev) => {
      const gear = this.item.system.gear;
      console.log("INCREASE GEAR", gear);
      const mapping = {
        'd12': 12,
        'd10': 10,
        'd8': 8,
        'd6': 6,
        'd4': 4,
        'd2': 2,
        'd1': 1,
        'd0': 0
      }
      let current = '';
      if (mapping[gear.resourceCurrentDie] < mapping[gear.resourceDie] && gear.resourceCurrentDie === 'd0') {
        current = 'd1';
      } else if (mapping[gear.resourceCurrentDie] < mapping[gear.resourceDie] && gear.resourceCurrentDie === 'd1') {
        current = 'd2';
      } else if (mapping[gear.resourceCurrentDie] < mapping[gear.resourceDie] && gear.resourceCurrentDie === 'd2') {
        current = 'd4';
      } else if (mapping[gear.resourceCurrentDie] < mapping[gear.resourceDie] && gear.resourceCurrentDie === 'd4') {
        current = 'd6';
      } else if (mapping[gear.resourceCurrentDie] < mapping[gear.resourceDie] && gear.resourceCurrentDie === 'd6') {
        current = 'd8';
      } else if (mapping[gear.resourceCurrentDie] < mapping[gear.resourceDie] && gear.resourceCurrentDie === 'd8') {
        current = 'd10';
      } else if (mapping[gear.resourceCurrentDie] < mapping[gear.resourceDie] && gear.resourceCurrentDie === 'd10') {
        current = 'd12';
      } else {
        current = gear.resourceCurrentDie;
      }

      await this.item.update({
        'system.gear.resourceCurrentDie': current,
      });
    });

    html.on('click.edgelinerrpg', '.decrease-gear', async (ev) => {
      const gear = this.item.system.gear;
      console.log("DECREASE GEAR", gear);
      let current = '';
      if (gear.resourceCurrentDie === 'd12') {
        current = 'd10';
      } else if (gear.resourceCurrentDie === 'd10') {
        current = 'd8';
      } else if (gear.resourceCurrentDie === 'd8') {
        current = 'd6';
      } else if (gear.resourceCurrentDie === 'd6') {
        current = 'd4';
      } else if (gear.resourceCurrentDie === 'd4') {
        current = 'd2';
      } else if (gear.resourceCurrentDie === 'd2') {
        current = 'd1';
      } else {
        current = 'd0';
      }

      await this.item.update({
        'system.gear.resourceCurrentDie': current,
      });
    });

    html.on('click.edgelinerrpg', '.increase-vehiclewounds', async (ev) => {
      const vehiclewounds = this.item.system.vehiclewounds;
      const mapping = {
        'd12': 12,
        'd10': 10,
        'd8': 8,
        'd6': 6,
        'd4': 4,
        'd2': 2,
        'd1': 1,
        'd0': 0
      }
      let current = '';
      if (mapping[vehiclewounds.currentWounds] < mapping[vehiclewounds.armorDie] && vehiclewounds.currentWounds === 'd0') {
        current = 'd1';
      } else if (mapping[vehiclewounds.currentWounds] < mapping[vehiclewounds.armorDie] && vehiclewounds.currentWounds === 'd1') {
        current = 'd2';
      } else if (mapping[vehiclewounds.currentWounds] < mapping[vehiclewounds.armorDie] && vehiclewounds.currentWounds === 'd2') {
        current = 'd4';
      } else if (mapping[vehiclewounds.currentWounds] < mapping[vehiclewounds.armorDie] && vehiclewounds.currentWounds === 'd4') {
        current = 'd6';
      } else if (mapping[vehiclewounds.currentWounds] < mapping[vehiclewounds.armorDie] && vehiclewounds.currentWounds === 'd6') {
        current = 'd8';
      } else if (mapping[vehiclewounds.currentWounds] < mapping[vehiclewounds.armorDie] && vehiclewounds.currentWounds === 'd8') {
        current = 'd10';
      } else if (mapping[vehiclewounds.currentWounds] < mapping[vehiclewounds.armorDie] && vehiclewounds.currentWounds === 'd10') {
        current = 'd12';
      } else {
        current = vehiclewounds.currentWounds;
      }

      await this.item.update({
        'system.vehiclewounds.currentWounds': current,
      });
    });

    html.on('click.edgelinerrpg', '.decrease-vehiclewounds', async (ev) => {
      const vehiclewounds = this.item.system.vehiclewounds;

      let current = '';
      if (vehiclewounds.currentWounds === 'd12') {
        current = 'd10';
      } else if (vehiclewounds.currentWounds === 'd10') {
        current = 'd8';
      } else if (vehiclewounds.currentWounds === 'd8') {
        current = 'd6';
      } else if (vehiclewounds.currentWounds === 'd6') {
        current = 'd4';
      } else if (vehiclewounds.currentWounds === 'd4') {
        current = 'd2';
      } else if (vehiclewounds.currentWounds === 'd2') {
        current = 'd1';
      } else {
        current = 'd0';
      }

      await this.item.update({
        'system.vehiclewounds.currentWounds': current,
      });
    });
  }
}
