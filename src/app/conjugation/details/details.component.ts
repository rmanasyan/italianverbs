import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-conjugation-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  verb: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.verb = this.route.snapshot.params['verb'];
  }

}
