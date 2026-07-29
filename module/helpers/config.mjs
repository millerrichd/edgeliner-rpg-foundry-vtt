export const EDGELINER_RPG = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
EDGELINER_RPG.abilities = {
  agi: 'EDGELINER_RPG.Ability.Agi.long',
  end: 'EDGELINER_RPG.Ability.End.long',
  qui: 'EDGELINER_RPG.Ability.Qui.long',
  str: 'EDGELINER_RPG.Ability.Str.long',
  int: 'EDGELINER_RPG.Ability.Int.long',
  pre: 'EDGELINER_RPG.Ability.Pre.long',
  rea: 'EDGELINER_RPG.Ability.Rea.long',
  wil: 'EDGELINER_RPG.Ability.Wil.long'
};

EDGELINER_RPG.abilityAbbreviations = {
  agi: 'EDGELINER_RPG.Ability.Agi.abbr',
  end: 'EDGELINER_RPG.Ability.End.abbr',
  qui: 'EDGELINER_RPG.Ability.Qui.abbr',
  str: 'EDGELINER_RPG.Ability.Str.abbr',
  int: 'EDGELINER_RPG.Ability.Int.abbr',
  pre: 'EDGELINER_RPG.Ability.Pre.abbr',
  rea: 'EDGELINER_RPG.Ability.Rea.abbr',
  wil: 'EDGELINER_RPG.Ability.Wil.abbr'
};

EDGELINER_RPG.derivedAbilitiesValue = {
  defensemelee: 'EDGELINER_RPG.DerivedAbilityValue.DefenseMelee.long',
  defenserange: 'EDGELINER_RPG.DerivedAbilityValue.DefenseRange.long',
  encumbrance: 'EDGELINER_RPG.DerivedAbilityValue.Encumbrance.long',
  fatigue: 'EDGELINER_RPG.DerivedAbilityValue.Fatigue.long',
  initiative: 'EDGELINER_RPG.DerivedAbilityValue.Initiative.long',
  pace: 'EDGELINER_RPG.DerivedAbilityValue.Pace.long',
  stability: 'EDGELINER_RPG.DerivedAbilityValue.Stability.long'
};

EDGELINER_RPG.derivedAbilitiesValueAbbreviations = {
  defensemelee: 'EDGELINER_RPG.DerivedAbilityValue.Dfm.abbr',
  defenserange: 'EDGELINER_RPG.DerivedAbilityValue.Dfr.abbr',
  encumbrance: 'EDGELINER_RPG.DerivedAbilityValue.Enc.abbr',
  fatigue: 'EDGELINER_RPG.DerivedAbilityValue.Fat.abbr',
  initiative: 'EDGELINER_RPG.DerivedAbilityValue.Ini.abbr',
  pace: 'EDGELINER_RPG.DerivedAbilityValue.Pac.abbr',
  stability: 'EDGELINER_RPG.DerivedAbilityValue.Sta.abbr'
};

EDGELINER_RPG.derivedAbilitiesPool = {
  cybernetic: 'EDGELINER_RPG.DerivedAbilityPool.Cybernetic.long',
  faith: 'EDGELINER_RPG.DerivedAbilityPool.Faith.long',
  health: 'EDGELINER_RPG.DerivedAbilityPool.Health.long',
  mana: 'EDGELINER_RPG.DerivedAbilityPool.Mana.long',
  paceDie: 'EDGELINER_RPG.DerivedAbilityPool.PaceDie.long',
  psychic: 'EDGELINER_RPG.DerivedAbilityPool.Psychic.long',
};

EDGELINER_RPG.derivedAbilitiesPoolAbbreviations = {
  cybernetics: 'EDGELINER_RPG.DerivedAbilityPool.Cyb.abbr',
  faith: 'EDGELINER_RPG.DerivedAbilityPool.Fth.abbr',
  health: 'EDGELINER_RPG.DerivedAbilityPool.Hea.abbr',
  mana: 'EDGELINER_RPG.DerivedAbilityPool.Man.abbr',
  paceDie: 'EDGELINER_RPG.DerivedAbilityPool.PacD.abbr',
  psychic: 'EDGELINER_RPG.DerivedAbilityPool.Psy.abbr',
};

EDGELINER_RPG.skills = {
  animalhandling: 'EDGELINER_RPG.Skill.AnimalHandling.long',
  athletics: 'EDGELINER_RPG.Skill.Athletics.long',
  combatfire: 'EDGELINER_RPG.Skill.CombatFirearms.long',
  combatgunnery: 'EDGELINER_RPG.Skill.CombatGunnery.long',
  combatmelee: 'EDGELINER_RPG.Skill.CombatMelee.long',
  combatmissile: 'EDGELINER_RPG.Skill.CombatMissile.long',
  computers: 'EDGELINER_RPG.Skill.Computers.long',
  demolitions: 'EDGELINER_RPG.Skill.Demolitions.long',
  disguise: 'EDGELINER_RPG.Skill.Disguise.long',
  drive: 'EDGELINER_RPG.Skill.Drive.long',
  history: 'EDGELINER_RPG.Skill.History.long',
  intimidation: 'EDGELINER_RPG.Skill.Intimidation.long',
  lockstrapselectronic: 'EDGELINER_RPG.Skill.LockstrapsElectronic.long',
  lockstrapsmechanical: 'EDGELINER_RPG.Skill.LockstrapsMechanical.long',
  medicine: 'EDGELINER_RPG.Skill.Medicine.long',
  perception: 'EDGELINER_RPG.Skill.Perception.long',
  performance: 'EDGELINER_RPG.Skill.Performance.long',
  persuasion: 'EDGELINER_RPG.Skill.Persuasion.long',
  pilot:  'EDGELINER_RPG.Skill.Pilot.long',
  resistancediscipline: 'EDGELINER_RPG.Skill.ResistanceDiscipline.long',
  resistancemagic: 'EDGELINER_RPG.Skill.ResistanceMagic.long',
  resistancepoison: 'EDGELINER_RPG.Skill.ResistancePoison.long',
  resistancereflex: 'EDGELINER_RPG.Skill.ResistanceReflex.long',
  resistancestamina: 'EDGELINER_RPG.Skill.ResistanceStamina.long',
  stealth: 'EDGELINER_RPG.Skill.Stealth.long',
  survival: 'EDGELINER_RPG.Skill.Survival.long',
  technicalbiological: 'EDGELINER_RPG.Skill.TechnicalBiological.long',
  technicalcybernetics: 'EDGELINER_RPG.Skill.TechnicalCybernetics.long',
  technicalelectronic: 'EDGELINER_RPG.Skill.TechnicalElectronic.long',
  technicalmechanical: 'EDGELINER_RPG.Skill.TechnicalMechanical.long',
  technicalpower: 'EDGELINER_RPG.Skill.TechnicalPower.long',
  technicalsoftware: 'EDGELINER_RPG.Skill.TechnicalSoftware.long'
}

EDGELINER_RPG.skillsAbbreviations = {
  animalhandling: 'EDGELINER_RPG.Skill.AnimalHandling.abbr',
  athletics: 'EDGELINER_RPG.Skill.Athletics.abbr',
  combatfire: 'EDGELINER_RPG.Skill.CombatFirearms.abbr',
  combatgunnery: 'EDGELINER_RPG.Skill.CombatGunnery.abbr',
  combatmelee: 'EDGELINER_RPG.Skill.CombatMelee.abbr',
  combatmissile: 'EDGELINER_RPG.Skill.CombatMissile.abbr',
  computers: 'EDGELINER_RPG.Skill.Computers.abbr',
  demolitions: 'EDGELINER_RPG.Skill.Demolitions.abbr',
  disguise: 'EDGELINER_RPG.Skill.Disguise.abbr',
  drive: 'EDGELINER_RPG.Skill.Drive.abbr',
  history: 'EDGELINER_RPG.Skill.History.abbr',
  intimidation: 'EDGELINER_RPG.Skill.Intimidation.abbr',
  lockstrapselectronic: 'EDGELINER_RPG.Skill.LockstrapsElectronic.abbr',
  lockstrapsmechanical: 'EDGELINER_RPG.Skill.LockstrapsMechanical.abbr',
  medicine: 'EDGELINER_RPG.Skill.Medicine.abbr',
  perception: 'EDGELINER_RPG.Skill.Perception.abbr',
  performance: 'EDGELINER_RPG.Skill.Performance.abbr',
  persuasion: 'EDGELINER_RPG.Skill.Persuasion.abbr',
  pilot:  'EDGELINER_RPG.Skill.Pilot.abbr',
  resistancediscipline: 'EDGELINER_RPG.Skill.ResistanceDiscipline.abbr',
  resistancemagic: 'EDGELINER_RPG.Skill.ResistanceMagic.abbr',
  resistancereflex: 'EDGELINER_RPG.Skill.ResistanceReflex.abbr',
  resistancestamina: 'EDGELINER_RPG.Skill.ResistanceStamina.abbr',
  stealth: 'EDGELINER_RPG.Skill.Stealth.abbr',
  survival: 'EDGELINER_RPG.Skill.Survival.abbr',
  technicalbiological: 'EDGELINER_RPG.Skill.TechnicalBiological.abbr',
  technicalcybernetics: 'EDGELINER_RPG.Skill.TechnicalCybernetics.abbr',
  technicalelectronic: 'EDGELINER_RPG.Skill.TechnicalElectronic.abbr',
  technicalmechanical: 'EDGELINER_RPG.Skill.TechnicalMechanical.abbr',
  technicalpower: 'EDGELINER_RPG.Skill.TechnicalPower.abbr',
  technicalsoftware: 'EDGELINER_RPG.Skill.TechnicalSoftware.abbr'
}

EDGELINER_RPG.spellActions = {
  armor: 'EDGELINER_RPG.SpellAction.Armor.long',
  create: 'EDGELINER_RPG.SpellAction.Create.long',
  destroy: 'EDGELINER_RPG.SpellAction.Destroy.long',
  repair: 'EDGELINER_RPG.SpellAction.Repair.long',
  shield: 'EDGELINER_RPG.SpellAction.Shield.long',
  transform: 'EDGELINER_RPG.SpellAction.Transform.long',
  banish: 'EDGELINER_RPG.SpellAction.Banish.long',
  control: 'EDGELINER_RPG.SpellAction.Control.long',
  summon: 'EDGELINER_RPG.SpellAction.Summon.long'
}

EDGELINER_RPG.spellActionsAbbreviations = {
  armor: 'EDGELINER_RPG.SpellAction.Armor.abbr',
  create: 'EDGELINER_RPG.SpellAction.Create.abbr',
  destroy: 'EDGELINER_RPG.SpellAction.Destroy.abbr', 
  repair: 'EDGELINER_RPG.SpellAction.Repair.abbr',
  shield: 'EDGELINER_RPG.SpellAction.Shield.abbr',
  transform: 'EDGELINER_RPG.SpellAction.Transform.abbr',
  banish: 'EDGELINER_RPG.SpellAction.Banish.abbr',
  control: 'EDGELINER_RPG.SpellAction.Control.abbr',
  summon: 'EDGELINER_RPG.SpellAction.Summon.abbr'
}

EDGELINER_RPG.spellPowers = {
  air: 'EDGELINER_RPG.SpellPower.Air.long',
  animal: 'EDGELINER_RPG.SpellPower.Animal.long',
  dark: 'EDGELINER_RPG.SpellPower.Dark.long',
  earth: 'EDGELINER_RPG.SpellPower.Earth.long',
  fire: 'EDGELINER_RPG.SpellPower.Fire.long',
  force: 'EDGELINER_RPG.SpellPower.Force.long',
  light: 'EDGELINER_RPG.SpellPower.Light.long',
  plant: 'EDGELINER_RPG.SpellPower.Plant.long',
  water: 'EDGELINER_RPG.SpellPower.Water.long',
  ash: 'EDGELINER_RPG.SpellPower.Ash.long',
  fissure: 'EDGELINER_RPG.SpellPower.Fissure.long',
  lava: 'EDGELINER_RPG.SpellPower.Lava.long',
  mist: 'EDGELINER_RPG.SpellPower.Mist.long',
  mud: 'EDGELINER_RPG.SpellPower.Mud.long',
  steam: 'EDGELINER_RPG.SpellPower.Steam.long',
  angelic: 'EDGELINER_RPG.SpellPower.Angelic.long',
  demonic: 'EDGELINER_RPG.SpellPower.Demonic.long',
  spirit: 'EDGELINER_RPG.SpellPower.Spirit.long'
}

EDGELINER_RPG.spellPowersAbbreviations = {
  air: 'EDGELINER_RPG.SpellPower.Air.abbr',
  animal: 'EDGELINER_RPG.SpellPower.Animal.abbr',
  dark: 'EDGELINER_RPG.SpellPower.Dark.abbr',
  earth: 'EDGELINER_RPG.SpellPower.Earth.abbr',
  fire: 'EDGELINER_RPG.SpellPower.Fire.abbr',
  force: 'EDGELINER_RPG.SpellPower.Force.abbr',
  light: 'EDGELINER_RPG.SpellPower.Light.abbr',
  plant: 'EDGELINER_RPG.SpellPower.Plant.abbr',
  water: 'EDGELINER_RPG.SpellPower.Water.abbr',
  ash: 'EDGELINER_RPG.SpellPower.Ash.abbr',
  fissure: 'EDGELINER_RPG.SpellPower.Fissure.abbr',
  lava: 'EDGELINER_RPG.SpellPower.Lava.abbr',
  mist: 'EDGELINER_RPG.SpellPower.Mist.abbr',
  mud: 'EDGELINER_RPG.SpellPower.Mud.abbr',
  steam: 'EDGELINER_RPG.SpellPower.Steam.abbr',
  angelic: 'EDGELINER_RPG.SpellPower.Angelic.abbr',
  demonic: 'EDGELINER_RPG.SpellPower.Demonic.abbr',
  spirit: 'EDGELINER_RPG.SpellPower.Spirit.abbr'
}

EDGELINER_RPG.spellTargets = {
  it: 'EDGELINER_RPG.SpellTarget.It.long',
  me: 'EDGELINER_RPG.SpellTarget.Me.long',
  them: 'EDGELINER_RPG.SpellTarget.Them.long',
  there: 'EDGELINER_RPG.SpellTarget.There.long',
  you: 'EDGELINER_RPG.SpellTarget.You.long'
}

EDGELINER_RPG.spellTargetsAbbreviations = {
  it: 'EDGELINER_RPG.SpellTarget.It.abbr',
  me: 'EDGELINER_RPG.SpellTarget.Me.abbr',
  them: 'EDGELINER_RPG.SpellTarget.Them.abbr',
  there: 'EDGELINER_RPG.SpellTarget.There.abbr',
  you: 'EDGELINER_RPG.SpellTarget.You.abbr'
}