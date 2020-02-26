import { SelectionModel } from '@angular/cdk/collections'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import * as _ from 'lodash'

import { Character } from './character'
import { SpellsDialogComponent } from './components/spells-dialog/spells-dialog.component'
import { CharacterGender } from './data/gender.data'
import { AvailableSpecies } from './data/species.data'
import { Game } from './game'
import { GameService } from './game.service'
import { PrimaryAttribute, SubAttribute } from './species'
import { CharacterSpell, Spell } from './spell'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  // styleUrls: ['./app.component.scss'],
})
export class CharacterComponent implements OnInit {
  // statics
  public Species = _.values(AvailableSpecies)
  public Gender = _.values(CharacterGender)
  public PrimaryAttributes = _.values(PrimaryAttribute)
  public SubAttributes = _.values(SubAttribute)

  public character: Character
  public game: Game

  // component variables
  public spellsTableColumns = ['name', 'level', 'reduction']

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
  }

  onChange() {
    this.gameService.save()
  }

  updatePrimaryAttribute(event: Event, attributeName: PrimaryAttribute) {
    const input = event.target as HTMLInputElement
    this.character.setPrimaryAttributeScore(attributeName, JSON.parse(input.value))
    this.gameService.save()
  }

  updateSubAttribute(event: Event, attributeName: SubAttribute) {
    const input = event.target as HTMLInputElement
    this.character.setSubAttributeScore(attributeName, JSON.parse(input.value))
    this.gameService.save()
  }

  openSpellsDialog() {
    const dialog = this.dialog.open(SpellsDialogComponent, {
      minWidth: '600px',
      disableClose: true,
      data: {
        spells: this.character.spells.map((spell) => spell.spell),
      },
    })

    dialog.afterClosed().subscribe((selection: SelectionModel<Spell>) => {
      this.character.spells = selection.selected.map((spell) => {
        return new CharacterSpell(this.character, spell, 0)
      })

      this.gameService.save()
    })
  }
}
