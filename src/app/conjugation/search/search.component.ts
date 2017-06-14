import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-conjugation-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  search(value: string) {
    this.router.navigate(['/', value]);
  }
}
