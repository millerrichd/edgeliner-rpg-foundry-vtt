import EdgelinerRPGItemBase from "./base-item.mjs";

export default class EdgelinerRPGHindrance extends EdgelinerRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.isSignificant = new fields.BooleanField({ initial: false });

    return schema;
  }

}