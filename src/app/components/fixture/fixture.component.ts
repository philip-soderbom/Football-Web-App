import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {
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
        this.teamSearched = teamId;
        this.fetchFixtures(teamId,5,true);
      }
    }
  }

  fetchFixtures(teamId: string, count: number, future: boolean){
    if(future){
      this.subscription = this.teamServce.getUpcomingFixtures(teamId, count).subscribe(data => {

      });
    } else {
      this.subscription = this.teamServce.getPastFixtures(teamId, count).subscribe(data => {
        
      });
    }
  }
}
