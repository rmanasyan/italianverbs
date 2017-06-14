import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ConjugationService } from '../conjugation.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-conjugation-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  conjugations: Observable<any>;
  verb: string;

  constructor(private route: ActivatedRoute, private conjugationService: ConjugationService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        this.verb = params['verb'];
        return this.conjugationService.conjugate(this.verb);
      })
      .subscribe(conjugations => {
        this.conjugations = conjugations;
      });
  }

}
