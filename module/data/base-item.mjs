import EdgelinerRPGDataModel from "./base-model.mjs";

export default class EdgelinerRPGItemBase extends EdgelinerRPGDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.StringField({ required: true, blank: true });

    return schema;
  }

  /**
   * Shared schema fragment for the die+multiplier resource cost (e.g. "d6x2"), used by
   * gear, weapons, armor, cybernetics, vehicles, and vehicle weapons.
   */
  static defineResourceCostSchema() {
    const fields = foundry.data.fields;

    return new fields.SchemaField({
      die: new fields.StringField({
        required: true,
        initial: 'd4',
        choices: ['d4', 'd6', 'd8', 'd10', 'd12']
      }),
      multiplier: new fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial: 1,
        min: 1,
        max: 6
      })
    });
  }

}