import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { TeamService } from 'src/app/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  validSearch: boolean = true;

  teamId!: number;
  teamName!: string;
  country!: string;
  foundedYear!: number;
  
  stadiumId!: number;
  stadium!: string;
  address!: string;
  city!: string;
  capacity!: number;

  constructor(private teamService: TeamService, private stateService: StateService) {
  }

  ngOnInit(): void {
    if (window.localStorage.length > 0) {
      let teamSearch = window.localStorage.getItem('search');
      if (typeof teamSearch === 'string'){
        let obj: string[] = JSON.parse(teamSearch);
        let teamName = obj[0];
        this.printSearch(teamName)
      }
    }
  }

  // coming from child (add-task.ts) and its @Output()
  printSearch(search: string) {
    console.log("you searched for (in start.ts): ", search);
    // fetch from APIFootball
    this.teamService.getTeam(search).subscribe(data => {
      if (data.response.length > 0) {
        this.validSearch = true;
        console.log("fetched data: ", data);
        console.log("team searched for (in start.ts): ", data.response[0].team.name);

        this.teamName = data.response[0].team.name;
        this.teamId = data.response[0].team.id;
        this.country = data.response[0].team.country;
        this.foundedYear = data.response[0].team.founded;
        this.stadium = data.response[0].venue.name;
        this.stadiumId = data.response[0].venue.id;
        this.address = data.response[0].venue.address;
        this.city = data.response[0].venue.city;
        this.capacity = data.response[0].venue.capacity;


        this.storeLocally();      
        this.transferData();
      }
      else { 
        console.log("invalid search")
        this.validSearch = false;
      }
    })
  }

  // place fetched data in our StateService to access the same data from other components
  transferData(): void {
    this.stateService.ids = [
      ["Club ID", this.teamId],
      ["Stadium ID", this.stadiumId],
    ];
    this.stateService.displayData = [
      ["Club name", this.teamName],
      [this.teamName + " is based in", this.country],
      ["The club was founded in", this.foundedYear],
      ["Home stadium", this.stadium],
      ["Adress", this.address],
      ["City", this.city],
      ["Stadium capacity", this.capacity],
    ];

    this.stateService.valid = true;
    //this.router.navigate(['/team']);
  }

  storeLocally(): void {
    // clear previous search and replace with the new search
    if (window.localStorage.length > 0) {
      window.localStorage.clear();
      console.log("localStorage cleared")
    }
    console.log("Storing %s to localStorage", this.teamName)
    window.localStorage.setItem("search", JSON.stringify([this.teamName, this.teamId]));
  }

}