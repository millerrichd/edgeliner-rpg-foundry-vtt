import EdgelinerRPGActorBase from "./base-actor.mjs";

export default class EdgelinerRPGCharacter extends EdgelinerRPGActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        die: new fields.StringField({ required: true, initial: "d12" }),
        bonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 8}),
      });
      return obj;
    }, {}));

    // Iterate over derived ability names and create a new SchemaField for each.
    schema.derivedAbilitiesValue = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.derivedAbilitiesValue).reduce((obj, ability) => {
      if (ability === 'drainCurrent' || ability === 'drainMax') {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 12, min: 0, max: 18})
        });
      } else if (ability === 'implantCurrent' || ability === 'implantMax') {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 4, min: 2, max: 10})
        });
      } else if (ability === 'staminaCurrent' || ability === 'staminaMax') {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 12, min: 0, max: 18})
        });
      } else if (ability === 'wounds') {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 4})
        });
      } else if (ability === 'thresholdBase' || ability === 'thresholdStep1' || ability === 'thresholdStep2' || ability === 'thresholdStep3') {
        obj["thresholdBase"] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 6, min: 4, max: 8})
        });
        obj["thresholdStep1"] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 12, min: 10, max: 14})
        });
        obj["thresholdStep2"] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 20, min: 18, max: 22})
        });
        obj["thresholdStep3"] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 30, min: 28, max: 32})
        });
      } else if (ability === 'encumbranceCurrent' || ability === 'encumbranceMax') {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 6, min: 6, max: 12})
        });
      } else {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0, max: 12})
        });
      }
      return obj;
    }, {}));

    //iterate over the skills each category and create a new SchemaField for each
    schema.skillsCharm = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.skillsCharm).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6})
      });
      return obj;
    }, {}));
    schema.skillsFinesse = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.skillsFinesse).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6})
      });
      return obj;
    }, {}));
    schema.skillsIntellectual = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.skillsIntellectual).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6})
      });
      return obj;
    }, {}));
    schema.skillsKnowledge = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.skillsKnowledge).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6})
      });
      return obj;
    }, {}));
    schema.skillsMight = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.skillsMight).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6})
      });
      return obj;
    }, {}));
    schema.skillsPowerPsychic = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.skillsPowerPsychic).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6})
      });
      return obj;
    }, {}));
    schema.skillsPowerTotem = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.skillsPowerTotem).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6})
      });
      return obj;
    }, {}));
    schema.skillsPowerWords = new fields.SchemaField(Object.keys(CONFIG.EDGELINER_RPG.skillsPowerWords).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 6})
      });
      return obj;
    }, {}));

    // The usage die for worn armor, driven by the Armor skill rank (Might). Degrades as
    // it's used and can be reset to full via the Repair control.
    schema.armorUsage = new fields.SchemaField({
      currentDie: new fields.StringField({ initial: '' }),
      maxDie: new fields.StringField({ initial: '' })
    });

    // Totals across all currently-worn armor.
    schema.armorTotals = new fields.SchemaField({
      rating: new fields.SchemaField({
        arm: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        leg: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        torso: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        head: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
      }),
      evasionPenalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    // Psychic power construction-point selections, one number field per category per
    // power per group, built entirely from CONFIG.EDGELINER_RPG.psychicPowerGroups so
    // adding a new group/power/category there is all that's needed - no schema changes
    // required. Each category defaults to its first option's cost, so an untouched power
    // shows that option pre-selected rather than nothing checked.
    schema.psychicPowers = new fields.SchemaField(
      Object.entries(CONFIG.EDGELINER_RPG.psychicPowerGroups).reduce((groupsObj, [groupKey, powers]) => {
        groupsObj[groupKey] = new fields.SchemaField(
          Object.entries(powers).reduce((powersObj, [powerKey, power]) => {
            powersObj[powerKey] = new fields.SchemaField(
              Object.entries(power.categories).reduce((catObj, [categoryKey, category]) => {
                catObj[categoryKey] = new fields.NumberField({
                  ...requiredInteger,
                  initial: category.options[0].cost,
                  min: 0
                });
                return catObj;
              }, {})
            );
            return powersObj;
          }, {})
        );
        return groupsObj;
      }, {})
    );

    // Total CPs spent per psychic power (base cost plus the selected category costs).
    schema.psychicPowerTotals = new fields.SchemaField(
      Object.entries(CONFIG.EDGELINER_RPG.psychicPowerGroups).reduce((groupsObj, [groupKey, powers]) => {
        groupsObj[groupKey] = new fields.SchemaField(
          Object.keys(powers).reduce((obj, powerKey) => {
            obj[powerKey] = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
            return obj;
          }, {})
        );
        return groupsObj;
      }, {})
    );

    // Target Number per psychic power, derived from its CPs spent.
    schema.psychicPowerTN = new fields.SchemaField(
      Object.entries(CONFIG.EDGELINER_RPG.psychicPowerGroups).reduce((groupsObj, [groupKey, powers]) => {
        groupsObj[groupKey] = new fields.SchemaField(
          Object.keys(powers).reduce((obj, powerKey) => {
            obj[powerKey] = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
            return obj;
          }, {})
        );
        return groupsObj;
      }, {})
    );

    // return the schema to the base class for merging with the base schema
    return schema;
  }

  prepareDerivedData() {
    this._prepareEncumbrance();
    this._prepareArmor();
    this._prepareImplants();
    this._preparePsychicPowers();
  }

  /**
   * CPs spent on a psychic power is its flat base cost plus whatever the player has
   * currently selected for each of its categories (Targets, Resistance, Duration, etc.).
   * Target Number is derived from CPs spent: ceil(7 + CPs / 10), the same formula for
   * every psychic power.
   */
  _preparePsychicPowers() {
    for (const [groupKey, powers] of Object.entries(CONFIG.EDGELINER_RPG.psychicPowerGroups)) {
      for (const [powerKey, power] of Object.entries(powers)) {
        const selections = this.psychicPowers[groupKey][powerKey];
        const spent = Object.values(selections).reduce((sum, cost) => sum + cost, 0);
        const total = power.base + spent;
        this.psychicPowerTotals[groupKey][powerKey] = total;
        this.psychicPowerTN[groupKey][powerKey] = Math.ceil(7 + total / 10);
      }
    }
  }

  /**
   * Implant current is the total implant cost of all installed cybernetics, out of the
   * actor's implant max capacity.
   */
  _prepareImplants() {
    const items = this.parent?.items ?? [];
    const cyberneticItems = [...items].filter((i) => i.type === 'cybernetic');
    this.derivedAbilitiesValue.implantCurrent.value = cyberneticItems.reduce(
      (sum, i) => sum + i.system.cybernetic.implantCost,
      0
    );
  }

  /**
   * The usage die for worn armor is set by the Armor skill (Might) rank: 0 = d0, 1 = d2,
   * 2 = d4, 3 = d6, 4 = d8, 5 = d10, 6 = d12. Rating totals are summed per body location
   * (a piece covering "ALT" contributes its rating to arm, leg, and torso). Evasion
   * penalty is summed across all worn armor, plus an extra -1 stacking penalty once 3 or
   * more pieces are worn at once.
   */
  _prepareArmor() {
    const dieBySkillRank = ['d0', 'd2', 'd4', 'd6', 'd8', 'd10', 'd12'];
    const armorRank = this.skillsMight?.armor?.value ?? 0;
    const maxDie = dieBySkillRank[armorRank] ?? 'd0';

    this.armorUsage.maxDie = maxDie;
    if (this.armorUsage.currentDie === '') {
      this.armorUsage.currentDie = maxDie;
    }

    const items = this.parent?.items ?? [];
    const wornArmor = [...items].filter((i) => i.type === 'armor' && i.system.armor.worn);

    const locationLetters = { A: 'arm', L: 'leg', T: 'torso', H: 'head' };
    const rating = { arm: 0, leg: 0, torso: 0, head: 0 };
    for (const item of wornArmor) {
      for (const letter of item.system.armor.location) {
        const location = locationLetters[letter];
        if (location) rating[location] += item.system.armor.rating;
      }
    }

    // A depleted (d0) usage die halves all worn armor ratings.
    if (this.armorUsage.currentDie === 'd0') {
      rating.arm = Math.floor(rating.arm / 2);
      rating.leg = Math.floor(rating.leg / 2);
      rating.torso = Math.floor(rating.torso / 2);
      rating.head = Math.floor(rating.head / 2);
    }

    this.armorTotals.rating.arm = rating.arm;
    this.armorTotals.rating.leg = rating.leg;
    this.armorTotals.rating.torso = rating.torso;
    this.armorTotals.rating.head = rating.head;

    let evasionPenalty = wornArmor.reduce((sum, i) => sum + i.system.armor.evasionPenalty, 0);
    if (wornArmor.length >= 3) evasionPenalty += 1;
    this.armorTotals.evasionPenalty = evasionPenalty;
  }

  /**
   * Encumbrance max is 6 plus 1 per rank of the Packing skill (Intellectual).
   * Encumbrance current is the total size, in normal-item-equivalent slots, of carried
   * gear/weapons/armor/cyberdecks. Up to 2 one-handed (or 1 two-handed) weapons are
   * carried for free. Worn armor never counts - armored clothing, vests, and long coats
   * can all be layered at once - only unworn/carried armor counts against the total.
   */
  _prepareEncumbrance() {
    const packingRank = this.skillsIntellectual?.packing?.value ?? 0;
    this.derivedAbilitiesValue.encumbranceMax.value = 6 + packingRank;

    const slotValue = CONFIG.EDGELINER_RPG.itemSizeSlots;
    const items = this.parent?.items ?? [];
    let encumbranceCurrent = 0;

    // Gear and cyberdecks always count fully.
    for (const item of items) {
      if (item.type !== 'item' && item.type !== 'cyberdeck') continue;
      encumbranceCurrent += slotValue[item.system.size] ?? 1;
    }

    // Worn armor is always free; only unworn armor counts.
    const armorItems = [...items].filter((i) => i.type === 'armor');
    for (const item of armorItems) {
      if (item.system.armor.worn) continue;
      encumbranceCurrent += slotValue[item.system.size] ?? 1;
    }

    // 2 free "hands" worth of weapons: 2 one-handed, or 1 two-handed.
    let freeHands = 2;
    const weaponItems = [...items].filter((i) => i.type === 'weapon');
    for (const item of weaponItems) {
      const hands = item.system.weapon.handedness === 'twoHanded' ? 2 : 1;
      if (hands <= freeHands) {
        freeHands -= hands;
      } else {
        encumbranceCurrent += slotValue[item.system.size] ?? 1;
      }
    }

    this.derivedAbilitiesValue.encumbranceCurrent.value = encumbranceCurrent;
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k,v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    console.log("ROLLDATA", data);

    data.lvl = this.attributes.level.value;

    return data
  }
}