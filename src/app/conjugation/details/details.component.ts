import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-conjugation-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  conjugations: Observable<any[]>;
  verb: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.verb = params['verb'];
      return this.db.list('/verbs', {
          query: {
            orderByChild: 'italian',
            equalTo: params['verb']
          }
        });
      }).switchMap(verbs => {
        const key = verbs[0] && verbs[0].$key;
        return this.db.object('/conjugations/' + key);
      }).subscribe(conjugations => this.conjugations = conjugations);
  }

}
