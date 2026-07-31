export const EDGELINER_RPG = {};

/**
 * Shared construction-point option tiers reused across multiple psychic powers.
 * @type {Array}
 */
const psychicTargets = [
  { label: '1 Target', cost: 3 },
  { label: '2 Targets', cost: 5 },
  { label: '3 Targets', cost: 7 },
  { label: '4 Targets', cost: 9 }
];
const psychicTargetRadius = [
  { label: 'Very Close Radius', cost: 3 },
  { label: 'Close Radius', cost: 5 },
  { label: 'Far Radius', cost: 7 },
  { label: 'Very Far Radius', cost: 9 }
];
const psychicDuration = [
  { label: '1 round x PAB', cost: 1 },
  { label: '1 minute x PAB', cost: 3 },
  { label: '1 hour x PAB', cost: 6 }
];
const psychicResistance = [
  { label: '-1 Penalty', cost: 1 },
  { label: '-2 Penalty', cost: 4 },
  { label: '-3 Penalty', cost: 7 },
  { label: '-4 Penalty', cost: 10 },
  { label: '-5 Penalty', cost: 13 }
];
const psychicDamage = [
  { label: '2d4 damage', cost: 1 },
  { label: '2d6 damage', cost: 4 },
  { label: '2d8 damage', cost: 7 },
  { label: '2d10 damage', cost: 10 },
  { label: '2d12 damage', cost: 13 }
];
const psychicArmorRating = [
  { label: 'AR 4', cost: 3 },
  { label: 'AR 6', cost: 5 },
  { label: 'AR 8', cost: 7 },
  { label: 'AR 10', cost: 9 }
];
const psychicHeavyWeapon = [
  { label: 'Does not count as', cost: 0 },
  { label: 'Counts as', cost: 10 }
];
const psychicHeavyArmor = [
  { label: 'Does not count as', cost: 0 },
  { label: 'Counts as', cost: 10 }
];

/**
 * The construction-point (CP) build options for each Psychic power. `base` is a
 * flat cost every build pays; each entry under `categories` is a set of mutually
 * exclusive options (the player picks one per category) with its own CP cost. This
 * structure is the template for building out the rest of the psychic (and other) powers
 * the same way - both the actor schema and the psychic powers sheet are driven entirely
 * from this data, so adding a new power/category/option here is all that's needed.
 * @type {Object}
 */
EDGELINER_RPG.chronokinesisPowers = {
  sloth: {
    label: 'Sloth (Rank A)',
    base: 4,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration },
    }
  },
  speed: {
    label: 'Speed (Rank B)',
    base: 5,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      duration: { label: 'Duration', options: psychicDuration }
    }
  },
  rewindAction: {
    label: 'Rewind Action (Rank C)',
    base: 11,
    categories: {
      duration: { label: 'Duration', options: psychicDuration }
    }
  }
};
EDGELINER_RPG.controlPowers = {
  confusion: {
    label: 'Confusion (Rank A)',
    base: 3,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration },
    }
  },
  charm: {
    label: 'Charm (Rank B)',
    base: 5,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration },
    }
  },
  dominate: {
    label: 'Dominate (Rank C)',
    base: 7,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration },
    }
  }
}
EDGELINER_RPG.constructionPowers = {
  createItem: {
    label: 'Create Item (Rank A)',
    base: 4,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      objectSize: { label: 'Object Size', options: [
        { label: 'Tiny', cost: 1 },
        { label: 'Small', cost: 2 },
        { label: 'Medium', cost: 4 },
        { label: 'Large', cost: 7 }
      ]},
      mechanical: { label: "Mechanical", options: [
        { label: 'Non-mechanical Object', cost: 0 },
        { label: 'Mechanical Object (pistol, bicycle)', cost: 10 }
      ]}
    }
  },
  barrier: {
    label: 'Barrier (Rank B)',
    base: 6,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      wallSize: { label: 'Wall Size', options: [
        { label: "5' Wide, 5' Tall, 1' Thick", cost: 2 },
        { label: "10' Wide, 5' Tall, 1' Thick", cost: 5 },
        { label: "15' Wide, 5' Tall, 1' Thick", cost: 8 },
        { label: "20' Wide, 5' Tall, 1' Thick", cost: 12 }
      ]}
    }
  },
  createServant: {
    label: 'Create Servant (Rank C)',
    base: 10,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      attributes: { label: 'Attributes', options: [
        { label: 'd12+0', cost: 1 },
        { label: 'd10+2', cost: 3 },
        { label: 'd8+4', cost: 6 },
        { label: 'd6+6', cost: 10 },
        { label: 'd4+8', cost: 15 }
      ]},
      damage: { label: 'Damage', options: [
        { label: 'Not Combat Model', cost: 0 },
        { label: '2d4 damage', cost: 1 },
        { label: '2d6 damage', cost: 4 },
        { label: '2d8 damage', cost: 7 },
        { label: '2d10 damage', cost: 10 },
        { label: '2d12 damage', cost: 13 }
      ]},
      combatModel: { label: 'Combat Model', options: [
        { label: 'Non-Combat Servant', cost: 0 },
        { label: 'Combat Servant', cost: 10 }
      ]}
    }
  }
}
EDGELINER_RPG.cyrokinesisPowers = {
  freezeWater: {
    label: 'Freeze Water (Rank A)',
    base: 3,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      duration: { label: 'Duration', options: psychicDuration }
    }
  },
  throwIce: {
    label: 'Throw Ice (Rank B)',
    base: 4,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      damage: { label: 'Damage', options: psychicDamage },
      heavyWeapon: { label: 'Counts as Heavy Weapon', options: psychicHeavyWeapon }
    }
  },
  frozenArmor: {
    label: 'Frozen Armor (Rank C)',
    base: 5,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      armorRating: { label: 'Armor Rating', options: psychicArmorRating },
      heavyArmor: { label: 'Counts as Heavy Armor', options: psychicHeavyArmor }
    }    
  }
}
EDGELINER_RPG.detectionPowers = {
  locatePower: {
    label: 'Locate Power (Rank A)',
    base: 2,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      duration: { label: 'Duration', options: psychicDuration }
    }
  },
  locateThing: {
    label: 'Locate Thing (Rank B)',
    base: 3,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      duration: { label: 'Duration', options: psychicDuration }
    }
  },
  locatePerson: {
    label: 'Locate Person (Rank C)',
    base: 4,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      duration: { label: 'Duration', options: psychicDuration },
      resistance: { label: 'Resistance', options: psychicResistance }
    }
  }
}
EDGELINER_RPG.electrokinesisPowers = {
  shieldElectrical: {
    label: 'Shield Electrical (Rank A)',
    base: 5,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      armorRating: { label: 'Armor Rating', options: psychicArmorRating },
      heavyArmor: { label: 'Counts as Heavy Armor', options: psychicHeavyArmor }
    }
  },
  throwElectrical: {
    label: 'Throw Electrical (Rank B)',
    base: 4,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      damage: { label: 'Damage', options: psychicDamage },
      heavyWeapon: { label: 'Counts as Heavy Weapon', options: psychicHeavyWeapon }
    }
  },
  drainRechargeDevice: {
    label: 'Drain or Recharge Device (Rank C)',
    base: 4,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      resistance: { label: 'Resistance', options: psychicResistance }
    }
  }
}
EDGELINER_RPG.empathyPowers = {
  calmEmotions: {
    label: 'Calm Emotions (Rank A)',
    base: 3,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance }
    }
  },
  bolsterEmotions: {
    label: 'Bolster Emotions (Rank B)',
    base: 3,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      skillSelection: { label: 'Skill Selection', options: [
        { label: '1 Skill', cost: 3 },
        { label: '2 Skills', cost: 6 }
      ]}
    }
  },
  healing: {
    label: 'Healing (Rank C)',
    base: 3,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      healingAmount: { label: 'Healing Amount', options: [
        { label: '1 Wound', cost: 2 },
        { label: '2 Wounds', cost: 6 },
        { label: '3 Wounds', cost: 10 }
      ]}
    }
  }
}
EDGELINER_RPG.geokinesisPowers = {
  senseMineral: {
    label: 'Sense Mineral (Rank A)',
    base: 4,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius }
    }
  },
  throwShards: {
    label: 'Throw Shards (Rank B)',
    base: 4,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      damage: { label: 'Damage', options: psychicDamage },
      heavyWeapon: { label: 'Counts as Heavy Weapon', options: psychicHeavyWeapon }
    }
  },
  magnetize: {
    label: 'Magnetize (Rank C)',
    base: 6,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration }
    }
  }
}
EDGELINER_RPG.hydrokinesisPowers = {
  createEvaporateWater: {
    label: 'Create or Evaporate Water (Rank A)',
    base: 5,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      resistance: { label: 'Resistance', options: psychicResistance }
    }
  },
  throwWater: {
    label: 'Throw Water (Rank B)',
    base: 4,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      damage: { label: 'Damage', options: psychicDamage },
      heavyWeapon: { label: 'Counts as Heavy Weapon', options: psychicHeavyWeapon }
    }
  },
  engulf: {
    label: 'Engulf (Rank C)',
    base: 7,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration }
    }
  }
}
EDGELINER_RPG.machinePowers = {
  lockUp: {
    label: 'Lock Up (Rank A)',
    base: 5,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      duration: { label: 'Duration', options: psychicDuration }
    }
  },
  seeSignals: {
    label: 'See Signals (Rank B)',
    base: 5,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      duration: { label: 'Duration', options: psychicDuration }
    }
  },
  controlMachine: {
    label: 'Control Machine (Rank C)',
    base: 5,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      duration: { label: 'Duration', options: psychicDuration }
    }
  }
}
EDGELINER_RPG.mindPowers = {
  illusion: {
    label: 'Illusion (Rank A)',
    base: 6,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration }
    }
  },
  wipe: {
    label: 'Wipe (Rank B)',
    base: 9,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration },
      howFarBack: { label: 'How Far Back', options: [
        { label: '1 Hour x PAB', cost: 6 },
        { label: '1 Day x PAB', cost: 12 },
        { label: '1 Week x PAB', cost: 18 },
        { label: '1 Month x PAB', cost: 24 }
      ]}
    }
  },
  modify: {
    label: 'Modify (Rank C)',
    base: 12,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      duration: { label: 'Duration', options: psychicDuration },
      howFarBack: { label: 'How Far Back', options: [
        { label: '1 Hour x PAB', cost: 6 },
        { label: '1 Day x PAB', cost: 12 },
        { label: '1 Week x PAB', cost: 18 },
        { label: '1 Month x PAB', cost: 24 }
      ]}
    }
  }
}
EDGELINER_RPG.projectionPowers = {
  light: {
    label: 'Light (Rank A)',
    base: 3,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      duration: { label: 'Duration', options: psychicDuration }
    }
  },
  projectBlade: {
    label: 'Project Blade (Rank B)',
    base: 5,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      damage: { label: 'Damage', options: psychicDamage },
      heavyWeapon: { label: 'Counts as Heavy Weapon', options: psychicHeavyWeapon }
    }
  },
  projectPain: {
    label: 'Project Pain (Rank C)',
    base: 7,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      damage: { label: 'Damage', options: psychicDamage },
      heavyWeapon: { label: 'Counts as Heavy Weapon', options: psychicHeavyWeapon }
    }
  }
}
EDGELINER_RPG.pyrokinesisPowers = {
  shieldFire: {
    label: 'Shield Fire (Rank A)',
    base: 5,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      armorRating: { label: 'Armor Rating', options: psychicArmorRating },
      heavyArmor: { label: 'Counts as Heavy Armor', options: psychicHeavyArmor }
    }
  },
  controlFires: {
    label: 'Control Fires (Rank B)',
    base: 5,
    categories: {
      targetRadius: { label: 'Target Radius', options: psychicTargetRadius },
      resistance: { label: 'Resistance', options: psychicResistance }
    }
  },
  throwFire: {
    label: 'Throw Fire (Rank C)',
    base: 4,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      damage: { label: 'Damage', options: psychicDamage },
      heavyWeapon: { label: 'Counts as Heavy Weapon', options: psychicHeavyWeapon }
    }
  }
}
EDGELINER_RPG.telekinesisPowers = {
  throwObject: {
    label: 'Throw Object (Rank A)',
    base: 4,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      damage: { label: 'Damage', options: psychicDamage },
      heavyWeapon: { label: 'Counts as Heavy Weapon', options: psychicHeavyWeapon }
    }
  },
  shieldKinetic: {
    label: 'Shield Kinetic (Rank B)',
    base: 5,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      armorRating: { label: 'Armor Rating', options: psychicArmorRating },
      heavyArmor: { label: 'Counts as Heavy Armor', options: psychicHeavyArmor }
    }
  },
  flight: {
    label: 'Flight (Rank C)',
    base: 4,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      duration: { label: 'Duration', options: psychicDuration },
      pace: { label: 'Pace', options: [
        { label: '1 Stamina to fly a Very Close distance', cost: 3 },
        { label: '1 Stamina to fly a Close distance', cost: 6 },
        { label: '1 Stamina to fly a Far distance', cost: 9 },
        { label: '1 Stamina to fly a Very Far distance', cost: 12 }
      ]}
    }
  }
}
EDGELINER_RPG.telepathyPowers = {
  understandLanguage: {
    label: 'Understand Language (Rank A)',
    base: 3,
    categories: {
      duration: { label: 'Duration', options: psychicDuration },
      understanding: { label: 'Understanding', options: [
        { label: 'Speech Only', cost: 3 },
        { label: 'Written Only', cost: 4 },
        { label: 'Both Speech and Written', cost: 7 }
      ]}
    }
  },
  reading: {
    label: 'Reading (Rank B)',
    base: 7,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      resistance: { label: 'Resistance', options: psychicResistance },
      digging: { label: 'Digging', options: [
        { label: 'Surface Thoughts', cost: 3 },
        { label: 'Deep Thoughts', cost: 7 }
      ]}
    }
  },
  talking: {
    label: 'Talking (Rank C)',
    base: 9,
    categories: {
      targets: { label: 'Targets', options: psychicTargets },
      duration: { label: 'Duration', options: psychicDuration }
    }
  }
}

/**
 * Registry of every psychic power group (Chronokinesis, Control, Construction, ...).
 * The actor schema and the psychic powers sheet are both driven entirely off this
 * registry, so adding a new power group here (plus its own `EDGELINER_RPG.xPowers`
 * object above) is all that's needed - no other file has to change.
 * @type {Object}
 */
EDGELINER_RPG.psychicPowerGroups = {
  chronokinesis: EDGELINER_RPG.chronokinesisPowers,
  control: EDGELINER_RPG.controlPowers,
  construction: EDGELINER_RPG.constructionPowers,
  cyrokinesis: EDGELINER_RPG.cyrokinesisPowers,
  detection: EDGELINER_RPG.detectionPowers,
  electrokinesis: EDGELINER_RPG.electrokinesisPowers,
  empathy: EDGELINER_RPG.empathyPowers,
  geokinesis: EDGELINER_RPG.geokinesisPowers,
  hydrokinesis: EDGELINER_RPG.hydrokinesisPowers,
  machine: EDGELINER_RPG.machinePowers,
  mind: EDGELINER_RPG.mindPowers,
  projection: EDGELINER_RPG.projectionPowers,
  pyrokinesis: EDGELINER_RPG.pyrokinesisPowers,
  telekinesis: EDGELINER_RPG.telekinesisPowers,
  telepathy: EDGELINER_RPG.telepathyPowers
};

/**
 * The set of item size categories used within the system.
 * @type {Object}
 */
EDGELINER_RPG.itemSizes = {
  tiny: 'EDGELINER_RPG.ItemSize.Tiny.long',
  small: 'EDGELINER_RPG.ItemSize.Small.long',
  normal: 'EDGELINER_RPG.ItemSize.Normal.long',
  large: 'EDGELINER_RPG.ItemSize.Large.long'
};

/**
 * The number of normal-sized encumbrance slots a single item of each size occupies.
 * Small: 2 small = 1 normal. Tiny: 4 tiny = 1 normal. Large: 1 large = 2 normal.
 * @type {Object}
 */
EDGELINER_RPG.itemSizeSlots = {
  tiny: 0.25,
  small: 0.5,
  normal: 1,
  large: 2
};

/**
 * The set of weapon handedness categories used within the system.
 * @type {Object}
 */
EDGELINER_RPG.weaponHandedness = {
  oneHanded: 'EDGELINER_RPG.WeaponHandedness.OneHanded.abbr',
  twoHanded: 'EDGELINER_RPG.WeaponHandedness.TwoHanded.abbr'
};

/**
 * The die and multiplier options for an item's resource cost (e.g. "d6x2").
 * @type {Object}
 */
EDGELINER_RPG.resourceCostDice = ['d4', 'd6', 'd8', 'd10', 'd12'];
EDGELINER_RPG.resourceCostMultipliers = [1, 2, 3, 4, 5, 6];

/**
 * The standard set of dice used for weapon attack formulas.
 * @type {string[]}
 */
EDGELINER_RPG.dice = ['d4', 'd6', 'd8', 'd10', 'd12'];

/**
 * The set of weapon damage types used within the system.
 * @type {Object}
 */
EDGELINER_RPG.weaponDamageTypes = {
  blunt: 'EDGELINER_RPG.WeaponDamageType.Blunt.long',
  slash: 'EDGELINER_RPG.WeaponDamageType.Slash.long',
  pierce: 'EDGELINER_RPG.WeaponDamageType.Pierce.long',
  fire: 'EDGELINER_RPG.WeaponDamageType.Fire.long'
};

/**
 * The set of weapon range bands used within the system.
 * @type {Object}
 */
EDGELINER_RPG.weaponRanges = {
  melee: 'EDGELINER_RPG.WeaponRange.Melee.abbr',
  veryCloseClose: 'EDGELINER_RPG.WeaponRange.VeryCloseClose.abbr',
  closeFar: 'EDGELINER_RPG.WeaponRange.CloseFar.abbr',
  farVeryFar: 'EDGELINER_RPG.WeaponRange.FarVeryFar.abbr'
};

/**
 * The set of armor coverage combinations used within the system. Each is the set of
 * locations (Arm, Leg, Torso, Head) that piece of armor covers.
 * @type {Object}
 */
EDGELINER_RPG.armorLocations = {
  T: 'EDGELINER_RPG.ArmorLocation.T.long',
  AT: 'EDGELINER_RPG.ArmorLocation.AT.long',
  ALT: 'EDGELINER_RPG.ArmorLocation.ALT.long',
  ALTH: 'EDGELINER_RPG.ArmorLocation.ALTH.long'
};

/**
 * The single-band range values used by cyberdecks (as opposed to the paired bands
 * weapons use).
 * @type {Object}
 */
EDGELINER_RPG.cyberdeckRanges = {
  melee: 'EDGELINER_RPG.CyberdeckRange.Melee.abbr',
  veryClose: 'EDGELINER_RPG.CyberdeckRange.VeryClose.abbr',
  close: 'EDGELINER_RPG.CyberdeckRange.Close.abbr',
  far: 'EDGELINER_RPG.CyberdeckRange.Far.abbr',
  veryFar: 'EDGELINER_RPG.CyberdeckRange.VeryFar.abbr'
};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
EDGELINER_RPG.abilities = {
  charm: 'EDGELINER_RPG.Ability.Charm.long',
  finesse: 'EDGELINER_RPG.Ability.Finesse.long',
  intellectual: 'EDGELINER_RPG.Ability.Intellectual.long',
  knowledge: 'EDGELINER_RPG.Ability.Knowledge.long',
  might: 'EDGELINER_RPG.Ability.Might.long',
  power: 'EDGELINER_RPG.Ability.Power.long'
};
EDGELINER_RPG.abilityAbbreviations = {
  charm: 'EDGELINER_RPG.Ability.Charm.abbr',
  finesse: 'EDGELINER_RPG.Ability.Finesse.abbr',
  intellectual: 'EDGELINER_RPG.Ability.Intellectual.abbr',
  knowledge: 'EDGELINER_RPG.Ability.Knowledge.abbr',
  might: 'EDGELINER_RPG.Ability.Might.abbr',
  power: 'EDGELINER_RPG.Ability.Power.abbr'
};

EDGELINER_RPG.derivedAbilitiesValue = {
  encumbranceCurrent: 'EDGELINER_RPG.DerivedAbilityValue.EncumbranceCurrent.long',
  encumbranceMax: 'EDGELINER_RPG.DerivedAbilityValue.EncumbranceMax.long',
  drainCurrent: 'EDGELINER_RPG.DerivedAbilityValue.DrainCurrent.long',
  drainMax: 'EDGELINER_RPG.DerivedAbilityValue.DrainMax.long',
  implantCurrent: 'EDGELINER_RPG.DerivedAbilityValue.ImplantCurrent.long',
  implantMax: 'EDGELINER_RPG.DerivedAbilityValue.ImplantMax.long',
  staminaCurrent: 'EDGELINER_RPG.DerivedAbilityValue.StaminaCurrent.long',
  staminaMax: 'EDGELINER_RPG.DerivedAbilityValue.StaminaMax.long',
  wounds: 'EDGELINER_RPG.DerivedAbilityValue.Wounds.long',
  thresholdBase: 'EDGELINER_RPG.DerivedAbilityValue.ThresholdBase.long',
  thresholdStep1: 'EDGELINER_RPG.DerivedAbilityValue.ThresholdStep1.long',
  thresholdStep2: 'EDGELINER_RPG.DerivedAbilityValue.ThresholdStep2.long',
  thresholdStep3: 'EDGELINER_RPG.DerivedAbilityValue.ThresholdStep3.long'
};
EDGELINER_RPG.derivedAbilitiesValueAbbreviations = {
  encumbranceCurrent: 'EDGELINER_RPG.DerivedAbilityValue.EncumbranceCurrent.abbr',
  encumbranceMax: 'EDGELINER_RPG.DerivedAbilityValue.EncumbranceMax.abbr',
  drainCurrent: 'EDGELINER_RPG.DerivedAbilityValue.DrainCurrent.abbr',
  drainMax: 'EDGELINER_RPG.DerivedAbilityValue.DrainMax.abbr',
  implantCurrent: 'EDGELINER_RPG.DerivedAbilityValue.ImplantCurrent.abbr',
  implantMax: 'EDGELINER_RPG.DerivedAbilityValue.ImplantMax.abbr',
  staminaCurrent: 'EDGELINER_RPG.DerivedAbilityValue.StaminaCurrent.abbr',
  staminaMax: 'EDGELINER_RPG.DerivedAbilityValue.StaminaMax.abbr',
  wounds: 'EDGELINER_RPG.DerivedAbilityValue.Wounds.abbr',
  thresholdBase: 'EDGELINER_RPG.DerivedAbilityValue.ThresholdBase.abbr',
  thresholdStep1: 'EDGELINER_RPG.DerivedAbilityValue.ThresholdStep1.abbr',
  thresholdStep2: 'EDGELINER_RPG.DerivedAbilityValue.ThresholdStep2.abbr',
  thresholdStep3: 'EDGELINER_RPG.DerivedAbilityValue.ThresholdStep3.abbr'
};

EDGELINER_RPG.skillsCharm = {
  animalhandling: 'EDGELINER_RPG.SkillsCharm.AnimalHandling.long',
  deception: 'EDGELINER_RPG.SkillsCharm.Deception.long',
  gambling: 'EDGELINER_RPG.SkillsCharm.Gambling.long',
  insight: 'EDGELINER_RPG.SkillsCharm.Insight.long',
  intimidate: 'EDGELINER_RPG.SkillsCharm.Intimidate.long',
  leadership: 'EDGELINER_RPG.SkillsCharm.Leadership.long',
  performance: 'EDGELINER_RPG.SkillsCharm.Performance.long',
  persuade: 'EDGELINER_RPG.SkillsCharm.Persuade.long'
};
EDGELINER_RPG.skillsCharmAbbreviations = {
  animalhandling: 'EDGELINER_RPG.SkillsCharm.AnimalHandling.abbr',
  deception: 'EDGELINER_RPG.SkillsCharm.Deception.abbr',
  gambling: 'EDGELINER_RPG.SkillsCharm.Gambling.abbr',
  insight: 'EDGELINER_RPG.SkillsCharm.Insight.abbr',
  intimidate: 'EDGELINER_RPG.SkillsCharm.Intimidate.abbr',
  leadership: 'EDGELINER_RPG.SkillsCharm.Leadership.abbr',
  performance: 'EDGELINER_RPG.SkillsCharm.Performance.abbr',
  persuade: 'EDGELINER_RPG.SkillsCharm.Persuade.abbr'
};

EDGELINER_RPG.skillsFinesse = {
  acrobatics: 'EDGELINER_RPG.SkillsFinesse.Acrobatics.long',
  boating: 'EDGELINER_RPG.SkillsFinesse.Boating.long',
  dodge: 'EDGELINER_RPG.SkillsFinesse.Dodge.long',
  driving: 'EDGELINER_RPG.SkillsFinesse.Driving.long',
  heavyWeapons: 'EDGELINER_RPG.SkillsFinesse.HeavyWeapons.long',
  locksTraps: 'EDGELINER_RPG.SkillsFinesse.LocksTraps.long',
  mountedCombat: 'EDGELINER_RPG.SkillsFinesse.MountedCombat.long',
  piloting: 'EDGELINER_RPG.SkillsFinesse.Piloting.long',
  riding: 'EDGELINER_RPG.SkillsFinesse.Riding.long',
  shooting: 'EDGELINER_RPG.SkillsFinesse.Shooting.long',
  sleightOfHand: 'EDGELINER_RPG.SkillsFinesse.SleightOfHand.long',
  sneaking: 'EDGELINER_RPG.SkillsFinesse.Sneaking.long'
};
EDGELINER_RPG.skillsFinesseAbbreviations = {
  acrobatics: 'EDGELINER_RPG.SkillsFinesse.Acrobatics.abbr',
  boating: 'EDGELINER_RPG.SkillsFinesse.Boating.abbr',
  dodge: 'EDGELINER_RPG.SkillsFinesse.Dodge.abbr',
  driving: 'EDGELINER_RPG.SkillsFinesse.Driving.abbr',
  heavyWeapons: 'EDGELINER_RPG.SkillsFinesse.HeavyWeapons.abbr',
  locksTraps: 'EDGELINER_RPG.SkillsFinesse.LocksTraps.abbr',
  mountedCombat: 'EDGELINER_RPG.SkillsFinesse.MountedCombat.abbr',
  piloting: 'EDGELINER_RPG.SkillsFinesse.Piloting.abbr',
  riding: 'EDGELINER_RPG.SkillsFinesse.Riding.abbr',
  shooting: 'EDGELINER_RPG.SkillsFinesse.Shooting.abbr',
  sleightOfHand: 'EDGELINER_RPG.SkillsFinesse.SleightOfHand.abbr',
  sneaking: 'EDGELINER_RPG.SkillsFinesse.Sneaking.abbr'
};

EDGELINER_RPG.skillsIntellectual = {
  assessEnemy: 'EDGELINER_RPG.SkillsIntellectual.AssessEnemy.long',
  awareness: 'EDGELINER_RPG.SkillsIntellectual.Awareness.long',
  crafting: 'EDGELINER_RPG.SkillsIntellectual.Crafting.long',
  disguise: 'EDGELINER_RPG.SkillsIntellectual.Disguise.long',
  electronics: 'EDGELINER_RPG.SkillsIntellectual.Electronics.long',
  etiquette: 'EDGELINER_RPG.SkillsIntellectual.Etiquette.long',
  evaluate: 'EDGELINER_RPG.SkillsIntellectual.Evaluate.long',
  hacking: 'EDGELINER_RPG.SkillsIntellectual.Hacking.long',
  mechanics: 'EDGELINER_RPG.SkillsIntellectual.Mechanics.long',
  medicine: 'EDGELINER_RPG.SkillsIntellectual.Medicine.long',
  packing: 'EDGELINER_RPG.SkillsIntellectual.Packing.long',
  survival: 'EDGELINER_RPG.SkillsIntellectual.Survival.long'
};
EDGELINER_RPG.skillsIntellectualAbbreviations = {
  assessEnemy: 'EDGELINER_RPG.SkillsIntellectual.AssessEnemy.abbr',
  awareness: 'EDGELINER_RPG.SkillsIntellectual.Awareness.abbr',
  crafting: 'EDGELINER_RPG.SkillsIntellectual.Crafting.abbr',
  disguise: 'EDGELINER_RPG.SkillsIntellectual.Disguise.abbr',
  electronics: 'EDGELINER_RPG.SkillsIntellectual.Electronics.abbr',
  etiquette: 'EDGELINER_RPG.SkillsIntellectual.Etiquette.abbr',
  evaluate: 'EDGELINER_RPG.SkillsIntellectual.Evaluate.abbr',
  hacking: 'EDGELINER_RPG.SkillsIntellectual.Hacking.abbr',
  mechanics: 'EDGELINER_RPG.SkillsIntellectual.Mechanics.abbr',
  medicine: 'EDGELINER_RPG.SkillsIntellectual.Medicine.abbr',
  packing: 'EDGELINER_RPG.SkillsIntellectual.Packing.abbr',
  survival: 'EDGELINER_RPG.SkillsIntellectual.Survival.abbr'
};

EDGELINER_RPG.skillsKnowledge = {
  academics: 'EDGELINER_RPG.SkillsKnowledge.Academics.long',
  generalKnowledge: 'EDGELINER_RPG.SkillsKnowledge.GeneralKnowledge.long',
  languages: 'EDGELINER_RPG.SkillsKnowledge.Languages.long',
  occult: 'EDGELINER_RPG.SkillsKnowledge.Occult.long',
  research: 'EDGELINER_RPG.SkillsKnowledge.Research.long',
  science: 'EDGELINER_RPG.SkillsKnowledge.Science.long',
  streetwise: 'EDGELINER_RPG.SkillsKnowledge.Streetwise.long'
};
EDGELINER_RPG.skillsKnowledgeAbbreviations = {
  academics: 'EDGELINER_RPG.SkillsKnowledge.Academics.abbr',
  generalKnowledge: 'EDGELINER_RPG.SkillsKnowledge.GeneralKnowledge.abbr',
  languages: 'EDGELINER_RPG.SkillsKnowledge.Languages.abbr',
  occult: 'EDGELINER_RPG.SkillsKnowledge.Occult.abbr',
  research: 'EDGELINER_RPG.SkillsKnowledge.Research.abbr',
  science: 'EDGELINER_RPG.SkillsKnowledge.Science.abbr',
  streetwise: 'EDGELINER_RPG.SkillsKnowledge.Streetwise.abbr'
};

EDGELINER_RPG.skillsMight = {
  athletics: 'EDGELINER_RPG.SkillsMight.Athletics.long',
  armor: 'EDGELINER_RPG.SkillsMight.Armor.long',
  martialArts: 'EDGELINER_RPG.SkillsMight.MartialArts.long',
  meleeWeapons: 'EDGELINER_RPG.SkillsMight.MeleeWeapons.long',
  thrown: 'EDGELINER_RPG.SkillsMight.Thrown.long'
};
EDGELINER_RPG.skillsMightAbbreviations = {
  athletics: 'EDGELINER_RPG.SkillsMight.Athletics.abbr',
  armor: 'EDGELINER_RPG.SkillsMight.Armor.abbr',
  martialArts: 'EDGELINER_RPG.SkillsMight.MartialArts.abbr',
  meleeWeapons: 'EDGELINER_RPG.SkillsMight.MeleeWeapons.abbr',
  thrown: 'EDGELINER_RPG.SkillsMight.Thrown.abbr'
};

EDGELINER_RPG.skillsPowerPsychic = {
  chronokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Chronokinesis.long',
  control: 'EDGELINER_RPG.SkillsPowerPsychic.Control.long',
  construction: 'EDGELINER_RPG.SkillsPowerPsychic.Construction.long',
  cyrokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Cyrokinesis.long',
  detection: 'EDGELINER_RPG.SkillsPowerPsychic.Detection.long',
  electrokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Electrokinesis.long',
  empathy: 'EDGELINER_RPG.SkillsPowerPsychic.Empathy.long',
  geokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Geokinesis.long',
  hydrokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Hydrokinesis.long',
  machine: 'EDGELINER_RPG.SkillsPowerPsychic.Machine.long',
  mind: 'EDGELINER_RPG.SkillsPowerPsychic.Mind.long',
  projection: 'EDGELINER_RPG.SkillsPowerPsychic.Projection.long',
  pyrokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Pyrokinesis.long',
  telekinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Telekinesis.long',
  telepathy: 'EDGELINER_RPG.SkillsPowerPsychic.Telepathy.long'
};
EDGELINER_RPG.skillsPowerPsychicAbbreviations = {
  chronokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Chronokinesis.abbr',
  control: 'EDGELINER_RPG.SkillsPowerPsychic.Control.abbr',
  construction: 'EDGELINER_RPG.SkillsPowerPsychic.Construction.abbr',
  cyrokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Cyrokinesis.abbr',
  detection: 'EDGELINER_RPG.SkillsPowerPsychic.Detection.abbr',
  electrokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Electrokinesis.abbr',
  empathy: 'EDGELINER_RPG.SkillsPowerPsychic.Empathy.abbr',
  geokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Geokinesis.abbr',
  hydrokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Hydrokinesis.abbr',
  machine: 'EDGELINER_RPG.SkillsPowerPsychic.Machine.abbr',
  mind: 'EDGELINER_RPG.SkillsPowerPsychic.Mind.abbr',
  projection: 'EDGELINER_RPG.SkillsPowerPsychic.Projection.abbr',
  pyrokinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Pyrokinesis.abbr',
  telekinesis: 'EDGELINER_RPG.SkillsPowerPsychic.Telekinesis.abbr',
  telepathy: 'EDGELINER_RPG.SkillsPowerPsychic.Telepathy.abbr'
};

EDGELINER_RPG.skillsPowerTotem = {
  attunement: 'EDGELINER_RPG.SkillsPowerTotem.Attunement.long',
  awakening: 'EDGELINER_RPG.SkillsPowerTotem.Awakening.long',
  banishing: 'EDGELINER_RPG.SkillsPowerTotem.Banishing.long',
  bolstering: 'EDGELINER_RPG.SkillsPowerTotem.Bolstering.long',
  communion: 'EDGELINER_RPG.SkillsPowerTotem.Communion.long',
  controlling: 'EDGELINER_RPG.SkillsPowerTotem.Controlling.long',
  creation: 'EDGELINER_RPG.SkillsPowerTotem.Creation.long',
  destructive: 'EDGELINER_RPG.SkillsPowerTotem.Destructive.long',
  growth: 'EDGELINER_RPG.SkillsPowerTotem.Growth.long',
  healing: 'EDGELINER_RPG.SkillsPowerTotem.Healing.long',
  protective: 'EDGELINER_RPG.SkillsPowerTotem.Protective.long',
  reduction: 'EDGELINER_RPG.SkillsPowerTotem.Reduction.long',
  sight: 'EDGELINER_RPG.SkillsPowerTotem.Sight.long',
  summoning: 'EDGELINER_RPG.SkillsPowerTotem.Summoning.long',
  transformation: 'EDGELINER_RPG.SkillsPowerTotem.Transformation.long'
};
EDGELINER_RPG.skillsPowerTotemAbbreviations = {
  attunement: 'EDGELINER_RPG.SkillsPowerTotem.Attunement.abbr',
  awakening: 'EDGELINER_RPG.SkillsPowerTotem.Awakening.abbr',
  banishing: 'EDGELINER_RPG.SkillsPowerTotem.Banishing.abbr',
  bolstering: 'EDGELINER_RPG.SkillsPowerTotem.Bolstering.abbr',
  communion: 'EDGELINER_RPG.SkillsPowerTotem.Communion.abbr',
  controlling: 'EDGELINER_RPG.SkillsPowerTotem.Controlling.abbr',
  creation: 'EDGELINER_RPG.SkillsPowerTotem.Creation.abbr',
  destructive: 'EDGELINER_RPG.SkillsPowerTotem.Destructive.abbr',
  growth: 'EDGELINER_RPG.SkillsPowerTotem.Growth.abbr',
  healing: 'EDGELINER_RPG.SkillsPowerTotem.Healing.abbr',
  protective: 'EDGELINER_RPG.SkillsPowerTotem.Protective.abbr',
  reduction: 'EDGELINER_RPG.SkillsPowerTotem.Reduction.abbr',
  sight: 'EDGELINER_RPG.SkillsPowerTotem.Sight.abbr',
  summoning: 'EDGELINER_RPG.SkillsPowerTotem.Summoning.abbr',
  transformation: 'EDGELINER_RPG.SkillsPowerTotem.Transformation.abbr'
};

EDGELINER_RPG.skillsPowerWords = {
  armorAction: 'EDGELINER_RPG.SkillsPowerWords.ArmorAction.long',
  banishAction: 'EDGELINER_RPG.SkillsPowerWords.BanishAction.long',
  controlAction: 'EDGELINER_RPG.SkillsPowerWords.ControlAction.long',
  createAction: 'EDGELINER_RPG.SkillsPowerWords.CreateAction.long',
  destroyAction: 'EDGELINER_RPG.SkillsPowerWords.DestroyAction.long',
  entangleAction: 'EDGELINER_RPG.SkillsPowerWords.EntangleAction.long',
  repairAction: 'EDGELINER_RPG.SkillsPowerWords.RepairAction.long',
  shieldAction: 'EDGELINER_RPG.SkillsPowerWords.ShieldAction.long',
  summonAction: 'EDGELINER_RPG.SkillsPowerWords.SummonAction.long',
  transformAction: 'EDGELINER_RPG.SkillsPowerWords.TransformAction.long',
  airPower: 'EDGELINER_RPG.SkillsPowerWords.AirPower.long',
  animalPower: 'EDGELINER_RPG.SkillsPowerWords.AnimalPower.long',
  darkPower: 'EDGELINER_RPG.SkillsPowerWords.DarkPower.long',
  earthPower: 'EDGELINER_RPG.SkillsPowerWords.EarthPower.long',
  firePower: 'EDGELINER_RPG.SkillsPowerWords.FirePower.long',
  forcePower: 'EDGELINER_RPG.SkillsPowerWords.ForcePower.long',
  lightPower: 'EDGELINER_RPG.SkillsPowerWords.LightPower.long',
  plantPower: 'EDGELINER_RPG.SkillsPowerWords.PlantPower.long',
  spiritPower: 'EDGELINER_RPG.SkillsPowerWords.SpiritPower.long',
  waterPower: 'EDGELINER_RPG.SkillsPowerWords.WaterPower.long',
  itTarget: 'EDGELINER_RPG.SkillsPowerWords.ItTarget.long',
  meTarget: 'EDGELINER_RPG.SkillsPowerWords.MeTarget.long',
  themTarget: 'EDGELINER_RPG.SkillsPowerWords.ThemTarget.long',
  thereTarget: 'EDGELINER_RPG.SkillsPowerWords.ThereTarget.long',
  usTarget: 'EDGELINER_RPG.SkillsPowerWords.UsTarget.long',
  youTarget: 'EDGELINER_RPG.SkillsPowerWords.YouTarget.long'
};

EDGELINER_RPG.skillsPowerWordsAbbreviations = {
  armorAction: 'EDGELINER_RPG.SkillsPowerWords.ArmorAction.abbr',
  banishAction: 'EDGELINER_RPG.SkillsPowerWords.BanishAction.abbr',
  controlAction: 'EDGELINER_RPG.SkillsPowerWords.ControlAction.abbr',
  createAction: 'EDGELINER_RPG.SkillsPowerWords.CreateAction.abbr',
  destroyAction: 'EDGELINER_RPG.SkillsPowerWords.DestroyAction.abbr',
  entangleAction: 'EDGELINER_RPG.SkillsPowerWords.EntangleAction.abbr',
  repairAction: 'EDGELINER_RPG.SkillsPowerWords.RepairAction.abbr',
  shieldAction: 'EDGELINER_RPG.SkillsPowerWords.ShieldAction.abbr',
  summonAction: 'EDGELINER_RPG.SkillsPowerWords.SummonAction.abbr',
  transformAction: 'EDGELINER_RPG.SkillsPowerWords.TransformAction.abbr',
  airPower: 'EDGELINER_RPG.SkillsPowerWords.AirPower.abbr',
  animalPower: 'EDGELINER_RPG.SkillsPowerWords.AnimalPower.abbr',
  darkPower: 'EDGELINER_RPG.SkillsPowerWords.DarkPower.abbr',
  earthPower: 'EDGELINER_RPG.SkillsPowerWords.EarthPower.abbr',
  firePower: 'EDGELINER_RPG.SkillsPowerWords.FirePower.abbr',
  forcePower: 'EDGELINER_RPG.SkillsPowerWords.ForcePower.abbr',
  lightPower: 'EDGELINER_RPG.SkillsPowerWords.LightPower.abbr',
  plantPower: 'EDGELINER_RPG.SkillsPowerWords.PlantPower.abbr',
  spiritPower: 'EDGELINER_RPG.SkillsPowerWords.SpiritPower.abbr',
  waterPower: 'EDGELINER_RPG.SkillsPowerWords.WaterPower.abbr',
  itTarget: 'EDGELINER_RPG.SkillsPowerWords.ItTarget.abbr',
  meTarget: 'EDGELINER_RPG.SkillsPowerWords.MeTarget.abbr',
  themTarget: 'EDGELINER_RPG.SkillsPowerWords.ThemTarget.abbr',
  thereTarget: 'EDGELINER_RPG.SkillsPowerWords.ThereTarget.abbr',
  usTarget: 'EDGELINER_RPG.SkillsPowerWords.UsTarget.abbr',
  youTarget: 'EDGELINER_RPG.SkillsPowerWords.YouTarget.abbr'
};
