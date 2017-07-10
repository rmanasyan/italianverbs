import { Component, OnInit } from '@angular/core';

import { ConjugationService } from '../conjugation.service';
import { SpinnerService } from '../spinner/spinner.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-conjugation-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  verbs: Array<any>;
  verbFirstLetter = '';

  constructor(private conjugationService: ConjugationService, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.present();

    this.conjugationService.listVerbs()
      .subscribe(verbs => {
        this.verbs = verbs;
        this.spinnerService.dismiss();
      });
  }

  isFirstInGroup(verb) {
    const firstChar = verb.italian.charAt(0);
    const isFirst = this.verbFirstLetter !== firstChar;
    this.verbFirstLetter = firstChar;

    return isFirst;
  }

}
