import EdgelinerRPGItemBase from "./base-item.mjs";

export default class EdgelinerRPGDrone extends EdgelinerRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.resourceCost = EdgelinerRPGItemBase.defineResourceCostSchema();

    schema.drone = new fields.SchemaField({
      thresholdBase: new fields.NumberField({ ...requiredInteger, initial: 4, min: 0 }),
      thresholdStep1: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      thresholdStep2: new fields.NumberField({ ...requiredInteger, initial: 18, min: 0 }),
      thresholdStep3: new fields.NumberField({ ...requiredInteger, initial: 28, min: 0 }),
      armor: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      evasion: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      handling: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      mounts: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    return schema;
  }

  prepareDerivedData() {
    // Only the base threshold is set on the item; the steps follow the same +6/+8/+10
    // progression used for the actor's own thresholds.
    const base = this.drone.thresholdBase;
    this.drone.thresholdStep1 = base + 6;
    this.drone.thresholdStep2 = base + 6 + 8;
    this.drone.thresholdStep3 = base + 6 + 8 + 10;
  }

}
