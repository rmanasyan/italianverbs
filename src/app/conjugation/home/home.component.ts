import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database';
import { ConjugationService } from '../conjugation.service';

@Component({
  selector: 'app-conjugation-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  verbs: FirebaseListObservable<any>;
  verbFirstLetter = '';

  constructor(private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.verbs = this.conjugationService.listVerbs();
  }

  isFirstInGroup(verb) {
    const firstChar = verb.italian.charAt(0);
    const isFirst = this.verbFirstLetter !== firstChar;
    this.verbFirstLetter = firstChar;

    return isFirst;
  }

}
