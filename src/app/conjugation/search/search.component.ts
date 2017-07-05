import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { ConjugationService } from '../conjugation.service';
import { Verb } from '../verb';

enum Key {
  Tab = 9,
  Enter = 13,
  Escape = 27,
  ArrowUp = 38,
  ArrowDown = 40
}

@Component({
  selector: 'app-conjugation-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchForm') searchForm: NgForm;

  searchTerm: string;
  verbs: Array<Verb> = [];
  suggestionsIndex = -1;
  suggestionsAvailable: boolean;
  private searchTerms$ = new Subject<string>();

  constructor(private router: Router, private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.searchTerms$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => term ? this.conjugationService.search(term) : Observable.of([]))
      .subscribe(verbs => {
        this.verbs = verbs;

        if (!verbs.length) {
          this.resetSuggestions();
        } else {
          this.suggestionsAvailable = true;
        }
      });
  }

  conjugate(verb: string) {
    this.router.navigate(['/', verb]);
    this.searchForm.reset();
  }

  isSuggestionSelected(index) {
    return this.suggestionsIndex === index;
  }

  navigateSuggestions(event: KeyboardEvent) {
    if (!this.suggestionsAvailable) {
      return;
    }

    switch (event.keyCode) {
      case Key.ArrowDown:
        event.preventDefault();
        this.suggestionsIndexDown();
        break;
      case Key.ArrowUp:
        event.preventDefault();
        this.suggestionsIndexUp();
        break;
      case Key.Enter:
      case Key.Tab:
        if (this.suggestionsIndex !== -1) {
          event.preventDefault();
          this.suggestionsConjugate();
          this.resetSuggestions();
        }
        break;
      case Key.Escape:
        event.preventDefault();
        this.resetSuggestions();
        break;
    }

  }

  resetSuggestions() {
    this.suggestionsIndex = -1;
    this.suggestionsAvailable = false;
  }

  searchVerbs(term: string) {
    this.searchTerms$.next(term);
  }

  suggestionsConjugate() {
    if (this.verbs.length && this.suggestionsIndex > -1) {
      this.conjugate(this.verbs[this.suggestionsIndex].italian);
      this.searchForm.reset();
    }
  }

  suggestionsIndexUp() {
    if (this.suggestionsIndex > 0) {
      this.suggestionsIndex--;
    }
  }

  suggestionsIndexDown() {
    if (this.suggestionsIndex < this.verbs.length - 1) {
      this.suggestionsIndex++;
    }
  }
}
