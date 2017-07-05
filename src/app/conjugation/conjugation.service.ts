import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ConjugationService {

  constructor(private db: AngularFireDatabase) { }

  conjugate(verb: string): Observable<any> {
    return this.verb(verb).switchMap(verbData => {
      const verbId = verbData[0] ? verbData[0]._id : -1;
      return this.db.list('/conjugation', {
        query: {
          orderByChild: 'verbid',
          equalTo: verbId
        }
      });
    });
  }

  conjugationTypes(): Observable<any> {
    return this.db.list('/conjugation_type', {
      query: {
        orderByChild: '_id'
      }
    })
  }

  conjugationGroups(): Observable<any> {
    return this.db.list('/conjugation_group', {
      query: {
        orderByChild: '_id'
      }
    })
  }

  conjugationPronouns(): Observable<any> {
    return this.db.list('/pronoun', {
      query: {
        orderByChild: '_id'
      }
    })
  }

  listVerbs(): FirebaseListObservable<any> {
    return this.db.list('/verb', {
      query: {
        orderByChild: 'italian'
      }
    });
  }

  search(term: string): FirebaseListObservable<any> {
    return this.db.list('/verb', {
      query: {
        orderByChild: 'italian',
        startAt: term,
        endAt: term + '\uf8ff'
      }
    });
  }

  verb(verb: string): FirebaseListObservable<any> {
    return this.db.list('/verb', {
      query: {
        orderByChild: 'italian',
        equalTo: verb
      }
    });
  }
}
