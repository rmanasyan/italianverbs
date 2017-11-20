import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {first, map, switchMap} from 'rxjs/operators';

import { ConjugationService } from '../conjugation.service';
import { Conjugation, ConjugationGroup, ConjugationType, Pronoun, Verb } from '../conjugation.interface';

@Component({
  selector: 'app-conjugation-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  conjugationGroups: Array<ConjugationGroup>;
  conjugationTypes: Array<ConjugationType>;
  conjugationPronouns: Array<Pronoun>;
  conjugations: Array<Conjugation>;
  loading = true;
  noConjugationsFound = false;
  verb: Observable<Verb>;
  verbQuery: string;

  constructor(private route: ActivatedRoute, private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.loadConjugations();
  }

  loadConjugations() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.verbQuery = params.get('verb');
      this.noConjugationsFound = false;
      this.conjugationGroups = [];

      const conjugationTypes$ = this.conjugationService.conjugationTypes();
      const conjugationGroups$ = this.conjugationService.conjugationGroups();
      const conjugationPronouns$ = this.conjugationService.conjugationPronouns();
      const conjugations$ = this.conjugationService.conjugate(this.verbQuery);

      this.verb = this.conjugationService.conjugatedVerb(this.verbQuery)
        .pipe(
          map(verbData => verbData[0]),
          switchMap(verbData => {
            return this.conjugationService.verbById(verbData.verbid);
          }),
          map(verbs => verbs[0])
        );

      forkJoin(
        conjugationGroups$.pipe(first()),
        conjugationTypes$.pipe(first()),
        conjugationPronouns$.pipe(first()),
        conjugations$.pipe(first())
      )
      .subscribe(([conjugationGroups, conjugationTypes, conjugationPronouns, conjugations]) => {
          this.conjugationGroups = conjugationGroups;
          this.conjugationTypes = conjugationTypes;
          this.conjugationPronouns = conjugationPronouns;
          this.conjugations = conjugations;
          this.noConjugationsFound = !conjugations.length;
          this.loading = false;
        }
      );
    });
  }

  conjugationTypeByGroup(groupId) {
    return this.conjugationTypes.filter(type => type.conjugation_group_id === groupId).sort((a, b) => a.sequence - b.sequence);
  }

  conjugationByType(typeId) {
    return this.conjugations.filter(conjugation => conjugation.conjugation_type_id === typeId);
  }

  conjugationPronoun(pronounId) {
    const conjugationPronoun = this.conjugationPronouns.find(pronoun => pronoun._id === pronounId);
    return conjugationPronoun ? conjugationPronoun.pronoun : '';
  }


}
