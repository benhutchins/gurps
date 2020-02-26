import * as _ from 'lodash'
import { CharacterGender } from './data/gender.data'
import { Spells } from './data/spells'
import { IPrimaryAttribute, ISpecies, PrimaryAttribute, SubAttribute } from './species'
import { Elf } from './species/elf'
import { CharacterSpell } from './spell'
import { AvailableSpecies } from './data/species.data'

export interface ICharacterPrimaryAttribute extends IPrimaryAttribute {
  score: number
}

export interface ICharacterSubAttribute {
  score: number
  base: number
  min: number
  max: number
  cost: number
}

interface ICharacterInfo {
  gender?: CharacterGender
  height?: string
  weight?: string
  sizeMod?: number
  age?: number
}

interface ICharacterSave {
  species?: string
  name?: string
  player?: string
  info?: ICharacterInfo
  primaryAttributes?: { [key: string]: number }
  subAttributes?: { [key: string]: number }
  spells?: { [key: string]: number }
}

export class Character {
  static load(): Character {
    const save: ICharacterSave = JSON.parse(localStorage.getItem('character') || '{}') || {}
    const character = new Character()

    if (save.species) {
      character.species = AvailableSpecies[save.species]
    }

    if (save.name) {
      character.name = save.name
    }

    if (save.player) {
      character.player = save.player
    }

    if (save.info) {
      character.info = save.info
    }

    if (save.primaryAttributes) {
      for (const primaryAttributeName of Object.keys(save.primaryAttributes)) {
        character.setPrimaryAttributeScore(primaryAttributeName as any, save.primaryAttributes[primaryAttributeName])
      }
    }

    if (save.subAttributes) {
      for (const subAttributeName of Object.keys(save.subAttributes)) {
        character.setSubAttributeScore(subAttributeName as any, save.subAttributes[subAttributeName])
      }
    }

    if (save.spells) {
      for (const spellName of Object.keys(save.spells)) {
        const adjustment = save.spells[spellName]
        const spell = new CharacterSpell(character, Spells[spellName], adjustment)
        character.spells.push(spell)
      }
    }

    return character
  }

  species: ISpecies

  name: string
  player: string
  info: ICharacterInfo = {}

  primaryAttributes: Map<PrimaryAttribute, ICharacterPrimaryAttribute> = new Map()
  subAttributes: Map<SubAttribute, ICharacterSubAttribute> = new Map()

  spells: CharacterSpell[] = []

  get usedPoints(): number {
    let points = 0

    for (const attr of this.primaryAttributes.values()) {
      points += attr.cost
    }

    for (const attr of this.subAttributes.values()) {
      points += attr.cost
    }

    return points
  }

  //#region helper utilities
  get strength(): number {
    return this.primaryAttributes.get(PrimaryAttribute.Strength).score
  }

  get intelligence(): number {
    return this.primaryAttributes.get(PrimaryAttribute.Intelligence).score
  }

  get dexterity(): number {
    return this.primaryAttributes.get(PrimaryAttribute.Dexterity).score
  }

  get health(): number {
    return this.primaryAttributes.get(PrimaryAttribute.Health).score
  }
  //#endregion helper utilities

  constructor() {
    this.species = Elf

    for (const attribute of _.values(PrimaryAttribute)) {
      this.setPrimaryAttributeScore(attribute, 0)
    }

    for (const attribute of _.values(SubAttribute)) {
      this.setSubAttributeScore(attribute, 0)
    }
  }

  save() {
    const save: ICharacterSave = {
      species: this.species ? this.species.name : undefined,
      name: this.name,
      player: this.player,
      info: this.info,
      primaryAttributes: {},
      subAttributes: {},
      spells: {},
    }

    for (const [primaryAttributeName, primaryAttribute] of this.primaryAttributes) {
      save.primaryAttributes[primaryAttributeName] = primaryAttribute.score
    }

    for (const [subAttributeName, subAttribute] of this.subAttributes) {
      save.subAttributes[subAttributeName] = subAttribute.score
    }

    for (const spell of this.spells) {
      save.spells[spell.name] = spell.adjustment
    }

    localStorage.setItem('character', JSON.stringify(save))
  }

  setPrimaryAttributeScore(attributeName: PrimaryAttribute, score: number) {
    const attribute: ICharacterPrimaryAttribute = this.primaryAttributes.get(attributeName) || {} as any
    const speciesAttribute = this.species.primaryAttributes.get(attributeName)

    attribute.score = score
    attribute.base = speciesAttribute.base
    attribute.min = speciesAttribute.min
    attribute.max = speciesAttribute.max
    attribute.cost = speciesAttribute.cost * (score - attribute.base)

    this.primaryAttributes.set(attributeName, attribute)
  }

  setSubAttributeScore(attributeName: SubAttribute, score: number) {
    const attribute: ICharacterSubAttribute = this.subAttributes.get(attributeName) || {} as any
    const speciesAttribute = this.species.subAttributes.get(attributeName)
    const characterPrimaryAttribute = this.primaryAttributes.get(speciesAttribute.base)

    attribute.score = score
    attribute.base = characterPrimaryAttribute.base
    attribute.min = Math.round(attribute.base + (1 + speciesAttribute.min))
    attribute.max = Math.round(attribute.base + (1 + speciesAttribute.max))
    attribute.cost = speciesAttribute.cost * (attribute.score - attribute.base)

    this.subAttributes.set(attributeName, attribute)
  }

  get basicLift(): number {
    const strength = this.primaryAttributes.get(PrimaryAttribute.Strength).score
    const lift = Math.pow(strength, 2) / 5
    return strength > 7 ? Math.round(lift) : lift
  }

  isPrimaryValidAttribute(attributeName: PrimaryAttribute) {
    const attribute = this.primaryAttributes.get(attributeName)
    if (attribute.score < attribute.min) {
      return 'too low'
    } else if (attribute.score > attribute.max) {
      return 'too high'
    } else {
      return 'valid'
    }
  }

  isSubValidAttribute(attributeName: SubAttribute) {
    const attribute = this.subAttributes.get(attributeName)
    if (attribute.score < attribute.min) {
      return 'too low'
    } else if (attribute.score > attribute.max) {
      return 'too high'
    } else {
      return 'valid'
    }
  }
}
