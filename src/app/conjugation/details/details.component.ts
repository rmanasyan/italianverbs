import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { ConjugationService } from '../conjugation.service';
import { Verb } from '../verb';

@Component({
  selector: 'app-conjugation-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  conjugationGroups: Array<any>;
  conjugationTypes: Array<any>;
  conjugationPronouns: Array<any>;
  conjugations: Array<any>;
  noConjugationsFound = false;
  verb: Verb;
  verbQuery: string;

  constructor(private route: ActivatedRoute, private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.loadConjugations();
  }

  loadConjugations() {
    this.route.params.subscribe((params: Params) => {
      this.verbQuery = params['verb'];
      this.noConjugationsFound = false;
      this.conjugationGroups = [];

      const conjugationTypes$ = this.conjugationService.conjugationTypes();
      const conjugationGroups$ = this.conjugationService.conjugationGroups();
      const conjugationPronouns$ = this.conjugationService.conjugationPronouns();
      const conjugations$ = this.conjugationService.conjugate(this.verbQuery);

      this.conjugationService.verb(this.verbQuery)
        .map(verbs => verbs[0])
        .subscribe(verb => this.verb = verb);

      Observable.forkJoin(conjugationGroups$.first(), conjugationTypes$.first(), conjugationPronouns$.first(), conjugations$.first())
        .subscribe(data => {
            this.conjugationGroups = data[0];
            this.conjugationTypes = data[1];
            this.conjugationPronouns = data[2];
            this.conjugations = data[3];
            this.noConjugationsFound = !data[3].length;
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
