import * as _ from 'lodash'

interface IGameSave {
  startingPoints?: number
}

export class Game {
  static load(): Game {
    const save: IGameSave = JSON.parse(localStorage.getItem('game') || '{}') || {}
    const game = new Game()

    if (save.startingPoints) {
      game.startingPoints = save.startingPoints
    }

    return game
  }

  public startingPoints = 300

  constructor() {
  }
}
