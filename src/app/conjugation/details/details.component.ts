import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-conjugation-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  verb: FirebaseObjectObservable<any[]>;
  constructor(private route: ActivatedRoute, private af: AngularFire) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.verb = this.af.database.object('/verbs/' + params['verb']);
      });
  }

}
