import { Injectable } from '@angular/core'

import { Character } from './character'
import { Game } from './game'

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // dynamics
  public character = Character.load()
  public game = Game.load()

  get availablePoints(): number {
    return this.game.startingPoints - this.character.usedPoints
  }

  public save() {
    this.character.save()
  }
}
