import { Character } from './character'
import { PrimaryAttribute } from './species'

export enum SpellSchool {
  Air = 'Air',
  Nature = 'Nature',
}

export enum SpellDifficulty {
  Easy = 'Easy',
  Average = 'Average',
  Hard = 'Hard',
  VeryHard = 'Very Hard',
}

export enum SpellUnits {
  Seconds,
  Minutes,
  Hours,
}

export interface ISpellConcentration {
  value: number
  min: number
  units: SpellUnits
}

export interface ISpellFatigue {
  cost: number
  min: number
}

export interface ISpellDuration {
  value: number
  units: SpellUnits
}

export class Spell {
  name: string
  school: SpellSchool
  difficulty: SpellDifficulty
  concentration: ISpellConcentration
  fatigue: ISpellFatigue
  range: string
  targetType: string
  targetArea: string
  resistance: string
  duration: ISpellDuration
  description: string

  get category() {
    switch (this.difficulty) {
      case SpellDifficulty.Easy: return 'Minor'
      case SpellDifficulty.Average: return 'Moderate'
      case SpellDifficulty.Hard: return 'Major'
      case SpellDifficulty.VeryHard: return 'Legendary'
    }
  }

  get level() {
    switch (this.difficulty) {
      case SpellDifficulty.Easy: return 0
      case SpellDifficulty.Average: return 1
      case SpellDifficulty.Hard: return 2
      case SpellDifficulty.VeryHard: return 3
    }
  }

  /**
   * Pulled from DataTables E:G2-E:G5
  */
  get adjustment() {
    switch (this.difficulty) {
      case SpellDifficulty.Easy: return 0
      case SpellDifficulty.Average: return 1
      case SpellDifficulty.Hard: return 2
      case SpellDifficulty.VeryHard: return 3
    }
  }

  constructor (input: {
    name: string,
    school: SpellSchool,
    difficulty: SpellDifficulty,
  }) {
    this.name = input.name
    this.school = input.school
    this.difficulty = input.difficulty
  }
}

export class CharacterSpell {
  get name(): string {
    return this.spell.name
  }

  get talentAdjustment() {
    return 0
  }

  get calculateValue(): number {
    return this.adjustment + this.spell.adjustment
  }

  get pointCost(): number {
    if (this.calculateValue > 1) {
      return (this.calculateValue - 1) * 4
    } else if (this.calculateValue === 1) {
      return 2
    } else if (this.calculateValue === 0) {
      return 1
    }
  }

  get level(): number {
    const intelligence = this.character.primaryAttributes.get(PrimaryAttribute.Intelligence)
    return intelligence.score + this.talentAdjustment + this.adjustment
  }

  get reduction(): number {
    return Math.min(0, 11 - this.level)
  }

  constructor (
    private character: Character,
    public spell: Spell,
    public adjustment: number,
  ) {}

}
