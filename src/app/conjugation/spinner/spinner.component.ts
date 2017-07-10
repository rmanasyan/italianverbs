import {Component, OnDestroy, OnInit} from '@angular/core';

import { SpinnerService } from './spinner.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy, OnInit {
  loading = false;
  private subscription: Subscription;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.subscription = this.spinnerService.loaderState
      .subscribe(state => {
        this.loading = state;
        console.log('state ', state);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
