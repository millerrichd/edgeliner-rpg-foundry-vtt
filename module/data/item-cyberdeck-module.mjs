import EdgelinerRPGItemBase from "./base-item.mjs";

export default class EdgelinerRPGCyberdeckModule extends EdgelinerRPGItemBase {

  static defineSchema() {
    const schema = super.defineSchema();

    schema.resourceCost = EdgelinerRPGItemBase.defineResourceCostSchema();

    return schema;
  }

}
