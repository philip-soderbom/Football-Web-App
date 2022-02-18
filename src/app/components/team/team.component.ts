import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  
  validSearch: boolean = false;
  teamIds!: any;
  teamDisplayData!: any;

  teamId!: number;
  teamName!: string;
  country!: string;
  foundedYear!: number;
  teamLogo!: string;
  
  stadiumId!: number;
  stadium!: string;
  address!: string;
  city!: string;
  capacity!: number;
  stadiumImage!: string;

  constructor(private stateService: StateService, private teamService: TeamService) { }

  ngOnInit(): void {
    // in teamData we have data such as IDs

    //this.validSearch = this.stateService.valid;
    // here we access data in StateService, and manually clear the StateService variables
    if (window.localStorage.length > 0) {
      console.log("Valid search OR search stored in localStorage")
      
      let teamSearch = window.localStorage.getItem('search');
      
      if (typeof teamSearch === 'string') {
        let obj: string[] = JSON.parse(teamSearch);
        let teamName = obj[0];
        this.teamService.getTeam(teamName).subscribe(data => {
          if (data.response.length > 0) {
            this.validSearch = true;

            this.teamName = data.response[0].team.name;
            this.teamId = data.response[0].team.id;
            this.country = data.response[0].team.country;
            this.foundedYear = data.response[0].team.founded;
            this.teamLogo = data.response[0].team.logo;
            this.stadium = data.response[0].venue.name;
            this.stadiumId = data.response[0].venue.id;
            this.address = data.response[0].venue.address;
            this.city = data.response[0].venue.city;
            this.capacity = data.response[0].venue.capacity;
            this.stadiumImage = data.response[0].venue.image;


            this.stateService.fillTeamData(
              this.teamName, this.teamId, this.country, this.foundedYear, this.teamLogo,
              this.stadium, this.stadiumId, this.address, this.city, this.capacity, this.stadiumImage
            )


            this.teamIds = this.stateService.ids;
            this.stateService.ids = [];
        
            this.teamDisplayData = this.stateService.displayData;
            this.stateService.displayData = [];
          }
        })
      }
      
    }
  }

}
