export enum PrimaryAttribute {
  Strength = 'Strength',
  Dexterity = 'Dexterity',
  Intelligence = 'Intelligence',
  Health = 'Health',
}

export enum SubAttribute {
  HitPoints = 'Hit Points',
  Will = 'Will',
  Perception = 'Perception',
  FatiguePoints = 'Fatigue Points',
}

export enum SpeedAttribute {
  BaseSpeed,
  Move,
}

export interface IPrimaryAttribute {
  base: number
  min: number
  max: number
  cost: number
}

export interface ISubAttribute {
  base: PrimaryAttribute
  min: number
  max: number
  cost: number
}

export interface ISpecies {
  name: string

  // primary attributes
  primaryAttributes: Map<PrimaryAttribute, IPrimaryAttribute>

  // sub attributes (semi-calculated based on primary attributes)
  subAttributes: Map<SubAttribute, ISubAttribute>

  speedAttributes: Map<SpeedAttribute, any>
}
