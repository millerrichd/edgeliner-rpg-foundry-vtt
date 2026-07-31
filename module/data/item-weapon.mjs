import EdgelinerRPGItemBase from "./base-item.mjs";

export default class EdgelinerRPGWeapon extends EdgelinerRPGItemBase {

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

    // Damage formula is First Die + Die (+ flat Bonus), e.g. "d6+d8" or "Might+d8".
    // `firstDie` is either a literal die or "might", in which case Might's ability
    // die is used instead.
    schema.weapon = new fields.SchemaField({
      stamina: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      damageType: new fields.StringField({
        required: true,
        initial: 'slash',
        choices: ['blunt', 'slash', 'pierce', 'fire']
      }),
      range: new fields.StringField({
        required: true,
        initial: 'melee',
        choices: ['melee', 'veryCloseClose', 'closeFar', 'farVeryFar']
      }),
      magazine: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      rateOfFire: new fields.NumberField({ ...requiredInteger, initial: 1 }),
      handedness: new fields.StringField({
        required: true,
        initial: 'oneHanded',
        choices: ['oneHanded', 'twoHanded']
      }),
      firstDie: new fields.StringField({
        required: true,
        initial: 'might',
        choices: ['d4', 'd6', 'd8', 'd10', 'd12', 'might']
      }),
      die: new fields.StringField({
        required: true,
        initial: 'd8',
        choices: ['d4', 'd6', 'd8', 'd10', 'd12']
      }),
      bonus: new fields.NumberField({ ...requiredInteger, initial: 0 }),
    })

    schema.formula = new fields.StringField({ blank: true });
    schema.formulaLabel = new fields.StringField({ blank: true });

    return schema;
  }

  prepareDerivedData() {
    const weapon = this.weapon;

    const hasAbility = weapon.firstDie === 'might';
    const sameDie = !hasAbility && weapon.firstDie === weapon.die;

    const bonusText = weapon.bonus ? (weapon.bonus > 0 ? `+${weapon.bonus}` : `${weapon.bonus}`) : '';

    if (sameDie) {
      // Matching non-ability dice collapse into a single term, e.g. "2d6" instead of "d6+d6".
      this.formulaLabel = `2${weapon.die}${bonusText}`;
      this.formula = `2${weapon.die}${bonusText}`;
    } else {
      const firstLabel = hasAbility ? 'Might' : weapon.firstDie;
      const firstFormula = hasAbility ? '1@might.die+@might.bonus' : `1${weapon.firstDie}`;

      // Human-readable label shown on the sheet, e.g. "Might+Bonus+d8" or "d6+d8+2".
      this.formulaLabel = `${firstLabel}+${weapon.die}${bonusText}`;
      // Actual Foundry roll formula, e.g. "1@might.die+@might.bonus+1d8" or "1d6+1d8+2".
      this.formula = `${firstFormula}+1${weapon.die}${bonusText}`;
    }
  }
}