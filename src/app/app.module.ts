import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConjugationModule } from './conjugation/conjugation.module';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyBaj3CZScW9UuHgFTMeyVvwJVLAKJ_lBSg',
  authDomain: 'italianverbs-52cae.firebaseapp.com',
  databaseURL: 'https://italianverbs-52cae.firebaseio.com',
  projectId: 'italianverbs-52cae',
  storageBucket: 'italianverbs-52cae.appspot.com',
  messagingSenderId: '708734038682'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ConjugationModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
