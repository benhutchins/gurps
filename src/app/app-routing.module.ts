import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharacterComponent } from './character.component'
import { BattleComponent } from './components/battle/battle.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'character',
  },
  {
    path: 'character',
    component: CharacterComponent,
  },
  {
    path: 'battle',
    component: BattleComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
