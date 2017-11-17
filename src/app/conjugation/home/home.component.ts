import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ConjugationService } from '../conjugation.service';
import { Verb } from '../conjugation.interface';

@Component({
  selector: 'app-conjugation-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  verbs: Observable<Verb[]>;
  verbFirstLetter = '';
  loading = true;

  constructor(private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.verbs = this.conjugationService.listVerbs();
    this.verbs.subscribe(verbs => this.loading = false);
  }

  isFirstInGroup(verb) {
    const firstChar = verb.italian.charAt(0);
    const isFirst = this.verbFirstLetter !== firstChar;
    this.verbFirstLetter = firstChar;

    return isFirst;
  }

}
