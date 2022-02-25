import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {
  @Input() teamName!: string;
  @Input() teamData!: any[];
  @Input() logo!: string;
  @Input() stadiumImg!: string;
  @Input() stadium!: string;

  teamIds!: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
