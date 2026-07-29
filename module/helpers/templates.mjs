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
    'systems/edgeliner-rpg/templates/actor/parts/actor-spells.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-traits.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-effects.hbs',

    // Sub Tabs of Gear
    'systems/edgeliner-rpg/templates/actor/parts/actor-combo-wapa.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-cybernetics.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-equipment.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/actor-vehicle.hbs',

    // Spell Energies Partials
    // Actions
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-armor.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-create.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-destroy.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-repair.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-shield.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-transform.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-banish.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-control.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-summon.hbs',
    // Powers
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-air.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-animal.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-dark.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-earth.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-fire.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-force.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-light.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-plant.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-water.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-ash.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-fissure.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-lava.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-mist.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-mud.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-steam.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-angelic.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-demonic.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-spirit.hbs',
    // Targets
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-it.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-me.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-them.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-there.hbs',
    'systems/edgeliner-rpg/templates/actor/parts/spellenergies/actor-spellenergy-you.hbs',

    // Item partials
    'systems/edgeliner-rpg/templates/item/parts/item-effects.hbs',
  ]);
};
