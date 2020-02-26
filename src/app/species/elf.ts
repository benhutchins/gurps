import { ISpecies, PrimaryAttribute, SubAttribute } from '../species'

export const Elf: ISpecies = {
  name: 'Elf',
  primaryAttributes: new Map([
    [
      PrimaryAttribute.Strength,
      {
        base: 9,
        min: 4,
        max: 14,
        cost: 11,
      },
    ],

    [
      PrimaryAttribute.Dexterity,
      {
        base: 12,
        min: 10,
        max: 22,
        cost: 12,
      },
    ],

    [
      PrimaryAttribute.Intelligence,
      {
        base: 10,
        min: 4,
        max: 16,
        cost: 10,
      },
    ],

    [
      PrimaryAttribute.Health,
      {
        base: 10,
        min: 4,
        max: 16,
        cost: 10,
      },
    ],
  ]),

  subAttributes: new Map([
    [
      SubAttribute.HitPoints,
      {
        base: PrimaryAttribute.Strength,
        min: -0.5,
        max: 0.5,
        cost: 2,
      },
    ],

    [
      SubAttribute.Will,
      {
        base: PrimaryAttribute.Intelligence,
        min: -0.5,
        max: 20,
        cost: 5,
      },
    ],

    [
      SubAttribute.Perception,
      {
        base: PrimaryAttribute.Intelligence,
        min: -0.5,
        max: 22,
        cost: 5,
      },
    ],

    [
      SubAttribute.FatiguePoints,
      {
        base: PrimaryAttribute.Health,
        min: -0.5,
        max: 0.5,
        cost: 3,
      },
    ],
  ]),

  speedAttributes: new Map(),
}
