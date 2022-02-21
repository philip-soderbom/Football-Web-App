import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {
  @Input() position!: any[];
  
  playerUrl: string = '/player/:';

  constructor() { }

  ngOnInit(): void {
  }

}
