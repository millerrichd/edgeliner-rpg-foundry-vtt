import EdgelinerRPGItemBase from "./base-item.mjs";

export default class EdgelinerRPGCyberdeck extends EdgelinerRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.size = new fields.StringField({
      required: true,
      initial: 'normal',
      choices: ['tiny', 'small', 'normal', 'large']
    });
    schema.resourceCost = EdgelinerRPGItemBase.defineResourceCostSchema();

    schema.cyberdeck = new fields.SchemaField({
      range: new fields.StringField({
        required: true,
        initial: 'veryClose',
        choices: ['melee', 'veryClose', 'close', 'far', 'veryFar']
      }),
      evasion: new fields.NumberField({ ...requiredInteger, initial: 8, min: 0 }),
      armor: new fields.NumberField({ ...requiredInteger, initial: 4, min: 0 }),
      damageDie: new fields.StringField({
        required: true,
        initial: 'd4',
        choices: ['d4', 'd6', 'd8', 'd10', 'd12']
      }),
      memory: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
      modules: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
      thresholdBase: new fields.NumberField({ ...requiredInteger, initial: 4, min: 0 }),
      thresholdStep1: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      thresholdStep2: new fields.NumberField({ ...requiredInteger, initial: 18, min: 0 }),
      thresholdStep3: new fields.NumberField({ ...requiredInteger, initial: 28, min: 0 })
    });

    return schema;
  }

  prepareDerivedData() {
    // Only the base threshold is set on the item; the steps follow the same +6/+8/+10
    // progression used for the actor's own thresholds.
    const base = this.cyberdeck.thresholdBase;
    this.cyberdeck.thresholdStep1 = base + 6;
    this.cyberdeck.thresholdStep2 = base + 6 + 8;
    this.cyberdeck.thresholdStep3 = base + 6 + 8 + 10;
  }

}
