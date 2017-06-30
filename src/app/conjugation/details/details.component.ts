import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ConjugationService } from '../conjugation.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';

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
  verb: string;

  constructor(private route: ActivatedRoute, private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.loadConjugations();
  }

  loadConjugations() {
    this.route.params.subscribe((params: Params) => {
      this.verb = params['verb'];
      this.noConjugationsFound = false;

      const conjugationTypes$ = this.conjugationService.conjugationTypes();
      const conjugationGroups$ = this.conjugationService.conjugationGroups();
      const conjugationPronouns$ = this.conjugationService.conjugationPronouns();
      const conjugations$ = this.conjugationService.conjugate(params['verb']);

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
