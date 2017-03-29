import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConjugationRoutingModule } from './conjugation-routing.module';
import { ConjugationComponent } from './conjugation.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    ConjugationRoutingModule
  ],
  declarations: [ConjugationComponent, SearchComponent, HomeComponent, DetailsComponent],
  exports: [ConjugationComponent]
})
export class ConjugationModule { }
