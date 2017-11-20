import { Injectable } from '@angular/core';

import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {map, switchMap} from 'rxjs/operators';

import { Conjugation, ConjugationGroup, ConjugationType, Pronoun, Verb } from './conjugation.interface';

@Injectable()
export class ConjugationService {

  constructor(private db: AngularFireDatabase) { }

  conjugate(verb: string): Observable<Conjugation[]> {
    return this.conjugatedVerb(verb)
      .pipe(
        map(verbData => verbData[0]),
        switchMap(verbData => {
          return this.db.list<Conjugation>('/conjugation', ref =>
            ref.orderByChild('verbid').equalTo(verbData.verbid)
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

  verbById(id): Observable<Verb[]> {
    return this.db.list<Verb>('/verb', ref =>
      ref.orderByChild('_id').equalTo(id)
    ).valueChanges();
  }

  conjugatedVerb(verb: string): Observable<Conjugation[]> {
    return this.db.list<Conjugation>('/conjugation', ref =>
      ref.orderByChild('verb').equalTo(verb).limitToFirst(1)
    ).valueChanges();
  }
}
