import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConjugationComponent } from './conjugation.component';
import { ConjugationRoutingModule } from './conjugation-routing.module';
import { ConjugationService } from './conjugation.service';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConjugationRoutingModule
  ],
  declarations: [ ConjugationComponent, DetailsComponent, HomeComponent, SearchComponent ],
  providers: [ ConjugationService ],
  exports: [ ConjugationComponent ]
})
export class ConjugationModule { }
