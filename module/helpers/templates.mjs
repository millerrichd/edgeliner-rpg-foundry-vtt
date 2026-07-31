/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/edgeliner-rpg/templates/actor/parts/actor-header.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-abilities.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-hindrances.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-skills.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-powers.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-talents.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-effects.hbs',

    // Sub Tabs of Gear
    'systems/edgeliner-rpg/templates/actor/parts/actor-cybernetics.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-equipment.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-vehicle.hbs',

    // Spell Energies Partials
    // Actions
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-armor.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-create.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-destroy.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-repair.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-shield.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-transform.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-banish.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-control.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-summon.hbs',
    // Powers
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-air.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-animal.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-dark.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-earth.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-fire.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-force.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-light.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-plant.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-water.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-spirit.hbs',
    // Targets
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-it.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-me.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-them.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-there.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/powers/actor-power-you.hbs',

    // Item partials
    'systems/edgeliner-rpg/templates/item/parts/item-effects.hbs',
  ]);
};
