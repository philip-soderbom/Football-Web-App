import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  private subscription!: Subscription;

  table!: any[];
  league!: string;
  teamSearched!: string;

  constructor(private teamServce: TeamService) { }


  ngOnInit(): void {
    if (window.localStorage.length > 0) {
      let teamSearch = window.localStorage.getItem('search');
      if (typeof teamSearch === 'string') {
        let obj: string[] = JSON.parse(teamSearch);
        let teamId = obj[1];
        let teamName = obj[0];
        this.teamSearched = teamName;
        this.fetchLeague(teamId);
      }
    }
    
  }

  fetchLeague(teamId: string) {
    this.subscription = this.teamServce.getLeague(teamId).subscribe(data => {
      let leagueId = data.response[0].league.id;
      this.teamServce.getStandings(leagueId.toString()).subscribe(data => {
        this.table = data.response[0].league.standings[0];
        this.league = data.response[0].league.name;
      })
    });
  }

  tableDescription(): string {
    return "P: played games | W: wins | D: draws | L: losses | Goals: scored - conceded | GD: goal difference";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
