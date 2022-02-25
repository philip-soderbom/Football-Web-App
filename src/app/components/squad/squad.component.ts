import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {
  private subscription!: Subscription;

  errorOccurred!: boolean;
  validSearch: boolean = false;
  teamName!: string;

  squad!: any[];
  goalkeepers: any[] = [];
  defenders:   any[] = [];
  midfielders: any[] = [];
  attackers:   any[] = [];


  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    // check if the fetch from the form has been approved
    if (window.localStorage.length > 0) {
      console.log("Valid search stored in localStorage")
      this.validSearch = true;
      let teamSearch = window.localStorage.getItem('search');
      if (typeof teamSearch === 'string') {
        let obj: string[] = JSON.parse(teamSearch);
        let teamId = obj[1];
        this.fetchSquad(teamId)
      }
    }
    else {
      this.validSearch = false;
    }   
  }

  fetchSquad(teamId: string) {
    this.subscription = this.teamService.getSquad(teamId).subscribe(data => {
      if (data.response[0] !== undefined) {
        console.log("squad fetched: ", data.response[0].players);
        this.squad = data.response[0].players;
        this.teamName = data.response[0].team.name;

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

  ngOnDestroy(): void {
    // validSearch is set to true only if we perform teamSearch(), if we dont do teamSerch()
    // subscription will never be set and so it would be undefined in here
    if (this.validSearch) {
      this.subscription.unsubscribe();
    }
  }

}
