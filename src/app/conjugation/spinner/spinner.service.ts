import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpinnerService {
  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  present() {
    console.log('present');
    this.loaderSubject.next(true);
  }

  dismiss() {
    console.log('dismiss');
    this.loaderSubject.next(false);
  }

}
