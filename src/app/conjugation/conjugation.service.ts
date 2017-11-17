import { Injectable } from '@angular/core';

import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { Conjugation, ConjugationGroup, ConjugationType, Pronoun, Verb } from './conjugation.interface';

@Injectable()
export class ConjugationService {

  constructor(private db: AngularFireDatabase) { }

  conjugate(verb: string): Observable<Conjugation[]> {
    return this.verb(verb)
      .pipe(
        switchMap(verbData => {
          const verbId = verbData[0] ? verbData[0]._id : -1;

          return this.db.list<Conjugation>('/conjugation', ref =>
            ref.orderByChild('verbid').equalTo(verbId)
          ).valueChanges();
        })
      );
  }

  conjugationTypes(): Observable<ConjugationType[]> {
    return this.db.list<ConjugationType>('/conjugation_type', ref =>
      ref.orderByChild('_id')
    ).valueChanges();
  }

  conjugationGroups(): Observable<ConjugationGroup[]> {
    return this.db.list<ConjugationGroup>('/conjugation_group', ref =>
      ref.orderByChild('_id')
    ).valueChanges();
  }

  conjugationPronouns(): Observable<Pronoun[]> {
    return this.db.list<Pronoun>('/pronoun', ref =>
      ref.orderByChild('_id')
    ).valueChanges();
  }

  listVerbs(): Observable<Verb[]> {
    return this.db.list<Verb>('/verb', ref =>
      ref.orderByChild('italian')
    ).valueChanges();
  }

  search(term: string): Observable<Verb[]> {
    return this.db.list<Verb>('/verb', ref =>
      ref.orderByChild('italian').startAt(term).endAt(term + '\uf8ff')
    ).valueChanges();
  }

  verb(verb: string): Observable<Verb[]> {
    return this.db.list<Verb>('/verb', ref =>
      ref.orderByChild('italian').equalTo(verb)
    ).valueChanges();
  }
}
