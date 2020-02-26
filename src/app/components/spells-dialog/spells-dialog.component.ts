import { SelectionModel } from '@angular/cdk/collections'
import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'

import { Spells } from 'src/app/data/spells'
import { Spell } from 'src/app/spell'

@Component({
  templateUrl: './spells-dialog.component.html',
})
export class SpellsDialogComponent {
  public displayedColumns = ['select', 'name', 'school', 'category']
  public dataSource = new MatTableDataSource<Spell>(Object.values(Spells))
  public selection: SelectionModel<Spell>

  constructor(
    public dialogRef: MatDialogRef<SpellsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.selection = new SelectionModel<Spell>(true, data.spells || [])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
