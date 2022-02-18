import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


// used to transfer data between components
export class StateService {

  // the variables below are set after fetching from API
  // then accessed in the wanted component
  displayData!: any[];
  ids!: any[];
  valid!: boolean;

  constructor() { }


  fillTeamData(teamName: string, teamId: number, country: string, foundedYear: number, stadium: string, stadiumId: number, address: string, city: string, capacity: number) {
    this.ids = [
      ["Club ID", teamId],
      ["Stadium ID", stadiumId],
    ];
    this.displayData = [
      ["Club name", teamName],
      [teamName + " is based in", country],
      ["The club was founded in", foundedYear],
      ["Home stadium", stadium],
      ["Adress", address],
      ["City", city],
      ["Stadium capacity", capacity],
    ];
  }

  fillSquadData() {
    
  }
}
