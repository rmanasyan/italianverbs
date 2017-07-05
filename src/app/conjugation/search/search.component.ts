import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConjugationService } from '../conjugation.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-conjugation-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  verbs = [];
  private searchTerms$ = new Subject<string>();

  constructor(private router: Router, private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.searchTerms$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => term ? this.conjugationService.search(term) : Observable.of([]))
      .subscribe(verbs => this.verbs = verbs);
  }

  conjugate(verb: string) {
    this.router.navigate(['/', verb]);
  }

  resetSuggestions() {
    this.verbs = [];
  }

  search(term: string) {
    this.searchTerms$.next(term);
  }
}
