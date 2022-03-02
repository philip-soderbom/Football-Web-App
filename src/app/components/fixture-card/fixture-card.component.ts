import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-fixture-card',
  templateUrl: './fixture-card.component.html',
  styleUrls: ['./fixture-card.component.css']
})
export class FixtureCardComponent implements OnInit {

  @Input() future!: boolean;
  @Input() fixture!: any;
  teamId!: string;
  constructor() { }

  ngOnInit(): void {
    if (window.localStorage.length > 0) {
      let teamSearch = window.localStorage.getItem('search');
      if (typeof teamSearch === 'string') {
        let obj: string[] = JSON.parse(teamSearch);
        this.teamId = obj[1];
      }
    }
  }

  styleForm(result: string): Object {
    let styleObj = {
      'text-align': 'center',
      'margin': '0',
      'min-width': '15px',
      'font-weight': 'bold',
      'background-color': this.decideColor(result)
    };
    return styleObj;
  }

  decideResult(){
  if(this.future){
    return '';
  }
  if(this.fixture.fixture.status.short==='PST'){
    return '';
  }
  if(this.fixture.teams.away.id === this.teamId){
    if (this.fixture.teams.away.winner) return 'W';
    if (this.fixture.teams.away.winner === false) return 'L';
    if (this.fixture.teams.away.winner === null) return 'D';
  } else {
    if (this.fixture.teams.home.winner) return 'W';
    if (this.fixture.teams.home.winner === false) return 'L';
    if (this.fixture.teams.home.winner === null) return 'D';
  }
  return '';
  }

  decideColor(result: string) {
    switch(result) {
      case 'W': return 'green';
      case 'D': return 'orange';
      case 'L': return '#F44336';
      default: return 'white';
    }
  }

}
