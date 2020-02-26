import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import * as _ from 'lodash'

import { Character } from 'src/app/character'
import { Game } from 'src/app/game'
import { GameService } from 'src/app/game.service'
import { getThrustDamage } from 'src/app/utils/thrust-damage'

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  public character: Character
  public game: Game

  public buckets: { [key: string]: string } = {
    surge: '0',
    magic: '0',
    magicFlat: '0',
  }

  constructor(
    private dialog: MatDialog,
    public gameService: GameService,
  ) {
    this.character = this.gameService.character
    this.game = this.gameService.game
  }

  ngOnInit() {
    this.character = this.gameService.character
    this.game = this.gameService.game

    const strength = this.calculateStrength()
    const thrustDamage = getThrustDamage(strength)
  }

  calculateStrength() {
    const base = this.character.strength
    const surgePointsSpent = parseFloat(this.buckets.surge)
    const NormalMagicBuffLevel = parseFloat(this.buckets.magic)
    const FlatMagicBuffAmount = parseFloat(this.buckets.magicFlat)
    let totalStrength = base

    // Handle the surge bonus
    if (typeof surgePointsSpent === 'number' && surgePointsSpent > 0 && surgePointsSpent < 7) {
      // surge points get you 25% per point spent, so we need to figure out if that's higher than the flat amount or not
      const boost = Math.round((0.25 * surgePointsSpent) * base)

      if (boost < (surgePointsSpent * 3)) {
        totalStrength +=  (surgePointsSpent * 3)
      } else {
        totalStrength += boost
      }
    }

    // Handle the normal spell buffs
    if (!isNaN(NormalMagicBuffLevel)) {
      // the normal magic buffs give +1 or +10% per level, so we need to figure out what's better
      const boost = Math.round(0.1 * NormalMagicBuffLevel * totalStrength)

      if (boost < NormalMagicBuffLevel) {
        totalStrength += NormalMagicBuffLevel
      } else {
        totalStrength += boost
      }
    }

    // Handle the flat spell buff amount
    if (typeof FlatMagicBuffAmount === 'number') {
      // just a flat bonus, so...
      totalStrength += FlatMagicBuffAmount
    }

    return totalStrength
  }
}
