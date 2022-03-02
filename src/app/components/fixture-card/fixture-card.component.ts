import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-fixture-card',
  templateUrl: './fixture-card.component.html',
  styleUrls: ['./fixture-card.component.css']
})
export class FixtureCardComponent implements OnInit {

  @Input() future!: boolean;
  @Input() fixture!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
