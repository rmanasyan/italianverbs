import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ConjugationService {

  constructor(private db: AngularFireDatabase) { }

  conjugate(verb: string): Observable<any> {
    return this.db.list('/verbs', {
      query: {
        orderByChild: 'italian',
        equalTo: verb
      }
    }).switchMap(verbs => {
      const key = verbs[0] && verbs[0].$key;
      return this.db.object('/conjugations/' + key);
    });
  }

}
