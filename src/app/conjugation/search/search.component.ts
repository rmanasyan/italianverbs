import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ConjugationService } from '../conjugation.service';
import { Verb } from '../conjugation.interface';

enum Key {
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
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChildren('verbLink') verbLinks: QueryList<any>;

  searchTerm: string;
  verbs: Array<Verb> = [];
  suggestionsIndex = -1;
  suggestionsAvailable: boolean;
  private searchTerms$ = new Subject<string>();

  constructor(private router: Router, private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.searchTerms$
      .pipe(
         debounceTime(300),
         distinctUntilChanged(),
         switchMap((term: string) => term ? this.conjugationService.search(term) : of([]))
      )
      .subscribe(verbs => {
        this.verbs = verbs;

        if (!verbs.length) {
          this.resetSuggestions();
        } else {
          this.suggestionsIndex = -1;
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
      case Key.Escape:
        event.preventDefault();
        this.resetSuggestions();
        break;
    }
  }

  resetSuggestions() {
    this.suggestionsIndex = -1;
    this.suggestionsAvailable = false;
    this.searchInput.nativeElement.focus();
  }

  searchVerbs(term: string) {
    this.searchTerms$.next(term);
  }

  suggestionsIndexUp() {
    if (this.suggestionsIndex > -1) {
      this.suggestionsIndex--;
      this.focusSuggestionsLink(this.suggestionsIndex);
    }
  }

  suggestionsIndexDown() {
    if (this.suggestionsIndex < this.verbs.length - 1) {
      this.suggestionsIndex++;
      this.focusSuggestionsLink(this.suggestionsIndex);
    }
  }

  focusSuggestionsLink(index) {
    if (index === -1) {
      this.searchInput.nativeElement.focus();
      return;
    }

    this.verbLinks.forEach((verbLink, i) => {
      if (i === index) {
        verbLink.nativeElement.focus();
      }
    });
  }
}
