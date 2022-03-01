import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  private subscription!: Subscription;

  validSearch: boolean = true;
  teamId!: number;
  teamName!: string;
  teamDisplayData!: any[];
  teamLogo!: string;
  stadium!: string;
  stadiumImage!: string;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    if (window.localStorage.length > 0) {
      let teamSearch = window.localStorage.getItem('search');
      if (typeof teamSearch === 'string') {
        let obj: string[] = JSON.parse(teamSearch);
        let teamName = obj[0];
        this.searchTeam(teamName)
      }
    }
    else {
      this.validSearch = false;
    }
  }

  searchTeam(search: string) {
    console.log("you searched for (in start.ts): ", search);
    // fetch from APIFootball
    if (search.length > 0) {
      this.subscription = this.teamService.getTeam(search).subscribe(data => {
        if (data.response.length > 0) {
          this.validSearch = true;

          console.log("fetched data: ", data);
          console.log("team searched for (in start.ts): ", data.response[0].team.name);
          let teamData = data.response[0].team;
          let venueData = data.response[0].venue;

          this.teamName = teamData.name;
          this.teamId = teamData.id;
          this.teamLogo = teamData.logo;
          this.stadiumImage = venueData.image;
          this.stadium = venueData.name;

          this.teamDisplayData = [
            ["Club name", teamData.name],
            [teamData.name + " is based in", teamData.country],
            ["The club was founded in", teamData.founded],
            ["Home stadium", venueData.name],
            ["Adress", venueData.address],
            ["City", venueData.city],
            ["Stadium capacity", venueData.capacity],
          ];

          this.storeLocally();
        }
        else {
          console.log("invalid search")
          this.validSearch = false;
        }
      })
    }
  }


  storeLocally(): void {
    console.log("Storing %s to localStorage", this.teamName)
    window.localStorage.setItem("search", JSON.stringify([this.teamName, this.teamId]));
  }

  ngOnDestroy(): void {
    if (this.validSearch) {
      this.subscription.unsubscribe();
    }
  }

}