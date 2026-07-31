import EdgelinerRPGItemBase from "./base-item.mjs";

export default class EdgelinerRPGArmor extends EdgelinerRPGItemBase {

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

    schema.armor = new fields.SchemaField({
      rating: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),
      location: new fields.StringField({
        required: true,
        initial: 'T',
        choices: ['T', 'ALT', 'AT', 'ALTH']
      }),
      wornUnder: new fields.StringField({ initial: '' }),
      evasionPenalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      worn: new fields.BooleanField({ initial: false })
    })

    return schema;
  }
}