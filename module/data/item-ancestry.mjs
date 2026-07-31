import EdgelinerRPGItemBase from "./base-item.mjs";

export default class EdgelinerRPGAncestry extends EdgelinerRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    // The ability this ancestry grants a free increase to (d10+2).
    schema.freeAbility = new fields.StringField({
      required: true,
      initial: 'charm',
      choices: ['charm', 'finesse', 'intellectual', 'knowledge', 'might', 'power']
    });

    return schema;
  }

}
