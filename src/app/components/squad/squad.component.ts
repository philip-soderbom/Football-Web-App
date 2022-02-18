import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { StateService } from 'src/app/services/state.service';
import { Squad } from 'src/app/interfaces/Squad';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {

  validSearch: boolean = false;
  teamIds!: any[];
  teamDisplayData!: any;

  squad!: any[];

  // playerName!: string;
  // playerId!: number;
  // playerAge!: number;
  // playerNumber!: number;
  // position!: string;


  constructor(private teamService: TeamService, private stateService: StateService) { }

  ngOnInit(): void {

    
    // check if the fetch from the form has been approved
    if (window.localStorage.length > 0) {
      console.log("Valid search stored in localStorage")
      let teamSearch = window.localStorage.getItem('search');
      if (typeof teamSearch === 'string') {
        let obj: string[] = JSON.parse(teamSearch);
        let teamId = obj[1];
        this.fetchSquad(teamId)
      }

      // this.teamIds = this.stateService.ids;
      // this.stateService.ids = [];
  
      // this.teamDisplayData = this.stateService.displayData;
      // this.stateService.displayData = [];
  

      this.validSearch = true;
      //this.fetchSquad();
    }

    
  }

  fetchSquad(teamId: string) {
    //let teamId = this.teamIds[0][1];
    this.teamService.getSquad(teamId).subscribe(squad => {
      // console.log(this.teamDisplayData[0][1] + " squad: ", squad.response[0].players);
      console.log("squad fetched: ", squad.response[0].players);
      this.squad = squad.response[0].players;     
    })
  }

}
