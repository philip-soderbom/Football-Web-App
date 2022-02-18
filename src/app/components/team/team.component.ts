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
  
  stadiumId!: number;
  stadium!: string;
  address!: string;
  city!: string;
  capacity!: number;

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
            this.stadium = data.response[0].venue.name;
            this.stadiumId = data.response[0].venue.id;
            this.address = data.response[0].venue.address;
            this.city = data.response[0].venue.city;
            this.capacity = data.response[0].venue.capacity;


            // this.stateService.ids = [
            //   ["Club ID", this.teamId],
            //   ["Stadium ID", this.stadiumId],
            // ];
            // this.stateService.displayData = [
            //   ["Club name", this.teamName],
            //   [this.teamName + " is based in", this.country],
            //   ["The club was founded in", this.foundedYear],
            //   ["Home stadium", this.stadium],
            //   ["Adress", this.address],
            //   ["City", this.city],
            //   ["Stadium capacity", this.capacity],
            // ];

            this.stateService.fillTeamData(
              this.teamName, this.teamId, this.country, this.foundedYear,
              this.stadium, this.stadiumId, this.address, this.city, this.capacity
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
