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

  errorOccurred!: boolean;
  validSearch: boolean = false;
  teamName!: string;

  squad!: any[];

  goalkeepers: any[] = [];
  defenders:   any[] = [];
  midfielders: any[] = [];
  attackers:   any[] = [];


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

      this.validSearch = true;


    }

    
  }

  fetchSquad(teamId: string) {
    this.teamService.getSquad(teamId).subscribe(squad => {
      if (squad.response[0] !== undefined) {
        console.log("squad fetched: ", squad.response[0].players);
        this.squad = squad.response[0].players;
        this.teamName = squad.response[0].team.name;

        // sort players based on position
        this.squad.map((player) => {
          let playerPosition = player.position;
          switch (playerPosition){
            case "Goalkeeper": this.goalkeepers.push(player); break;
            case "Defender": this.defenders.push(player); break;
            case "Midfielder": this.midfielders.push(player); break;
            case "Attacker": this.attackers.push(player); break;
            default: break;
          }
        })

      }
      else {
        this.errorOccurred = true;
      }
           
    })
  }

}
