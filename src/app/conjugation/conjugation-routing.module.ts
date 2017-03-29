import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ConjugationComponent} from './conjugation.component';
import {DetailsComponent} from './details/details.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '',
    component: ConjugationComponent,
    children: [
      { path: '',    component: HomeComponent },
      { path: ':verb', component: DetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConjugationRoutingModule { }
