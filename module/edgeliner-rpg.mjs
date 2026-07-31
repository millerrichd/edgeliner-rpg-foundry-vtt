// Import document classes.
import { EdgelinerRPGActor } from './documents/actor.mjs';
import { EdgelinerRPGItem } from './documents/item.mjs';
// Import sheet classes.
import { EdgelinerRPGActorSheet } from './sheets/actor-sheet.mjs';
import { EdgelinerRPGItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { EDGELINER_RPG } from './helpers/config.mjs';
// Import DataModel classes
import * as models from './data/_module.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.edgelinerrpg = {
    EdgelinerRPGActor,
    EdgelinerRPGItem,
    rollItemMacro,
  };

  // Add custom constants for configuration.
  CONFIG.EDGELINER_RPG = EDGELINER_RPG;

  // This Foundry build never populates CONFIG.TextEditor.engines.prosemirror, which is
  // what the {{editor}} Handlebars helper checks before deciding how to build the editor
  // element. Without it, the helper silently falls back to a static "editor-edit" button
  // that nothing in ApplicationV2 attaches a click handler to. Registering it here routes
  // {{editor}} through the real <prose-mirror> custom element instead, restoring working
  // click-to-edit behavior everywhere the helper is used.
  CONFIG.TextEditor.engines.prosemirror = {
    render: (config) => foundry.applications.elements.HTMLProseMirrorElement.create({
      ...config,
      toggled: config.toggled ?? config.button ?? false,
      enriched: config.enriched ?? config.value
    })
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = EdgelinerRPGActor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    character: models.EdgelinerRPGCharacter,
    npc: models.EdgelinerRPGNPC
  }
  CONFIG.Item.documentClass = EdgelinerRPGItem;
  CONFIG.Item.dataModels = {
    ancestry: models.EdgelinerRPGAncestry,
    armor: models.EdgelinerRPGArmor,
    cyberdeck: models.EdgelinerRPGCyberdeck,
    cyberdeckModule: models.EdgelinerRPGCyberdeckModule,
    cyberdeckProgram: models.EdgelinerRPGCyberdeckProgram,
    cybernetic: models.EdgelinerRPGCybernetic,
    drone: models.EdgelinerRPGDrone,
    hindrance: models.EdgelinerRPGHindrance,
    item: models.EdgelinerRPGItem,
    spell: models.EdgelinerRPGSpell,
    talent: models.EdgelinerRPGTalent,
    vehicle: models.EdgelinerRPGVehicle,
    vehicleweapon: models.EdgelinerRPGVehicleWeapon,
    weapon: models.EdgelinerRPGWeapon
  }

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  foundry.documents.collections.Actors.unregisterSheet('core', foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet('edgeliner-rpg', EdgelinerRPGActorSheet, {
    makeDefault: true,
    label: 'EDGELINER_RPG.SheetLabels.Actor',
  });
  foundry.documents.collections.Items.unregisterSheet('core', foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet('edgeliner-rpg', EdgelinerRPGItemSheet, {
    makeDefault: true,
    label: 'EDGELINER_RPG.SheetLabels.Item',
  });

  // Preload Handlebars templates.
  const partials = [
    "systems/edgeliner-rpg/templates/actor/parts/actor-abilities.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-ancestry.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-effects.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-equipment.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-header.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-hindrances.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-powers.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-psychic.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-skills.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-talents.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-totem.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-vehicle.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/actor-words.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-air.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-animal.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-armor.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-banish.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-control.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-create.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-dark.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-destroy.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-earth.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-fire.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-force.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-it.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-light.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-me.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-plant.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-repair.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-shield.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-spirit.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-summon.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-them.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-there.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-transform.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-water.hbs",
    "systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-you.hbs",
    "systems/edgeliner-rpg/templates/actor/actor-character-sheet.hbs",
    "systems/edgeliner-rpg/templates/actor/actor-npc-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/parts/item-effects.hbs",
    "systems/edgeliner-rpg/templates/item/item-ancestry-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-armor-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-cyberdeck-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-cyberdeckModule-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-cyberdeckProgram-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-cybernetic-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-drone-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-hindrance-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-item-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-power-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-talent-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-vehicle-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-vehicleweapon-sheet.hbs",
    "systems/edgeliner-rpg/templates/item/item-weapon-sheet.hbs",
  ]
  const paths = {};
  for ( const path of partials ) {
    // Register under the literal .hbs path too, since every {{> "..."}} partial
    // include in these templates references the raw source path directly.
    paths[path] = path;
    paths[path.replace(".hbs", ".html")] = path;
    paths[`edgeliner-rpg.${path.split("/").pop().replace(".hbs", "")}`] = path;
  }
  return foundry.applications.handlebars.loadTemplates(paths);
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

// Splits an object's entries into two halves (by insertion order) so a two-column
// layout can render each half as its own column without CSS overflowing into a third.
Handlebars.registerHelper('firstHalf', function (obj) {
  const entries = Object.entries(obj);
  const half = Math.ceil(entries.length / 2);
  return Object.fromEntries(entries.slice(0, half));
});

Handlebars.registerHelper('secondHalf', function (obj) {
  const entries = Object.entries(obj);
  const half = Math.ceil(entries.length / 2);
  return Object.fromEntries(entries.slice(half));
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.edgelinerrpg.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'edgeliner-rpg.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}
