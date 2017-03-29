import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ConjugationComponent} from './conjugation/conjugation.component';

const routes: Routes = [
  {path: '', component: ConjugationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
