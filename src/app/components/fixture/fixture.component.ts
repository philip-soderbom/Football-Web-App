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

  fixtures!: any[];
  selected!: number;
  futureFixture: boolean = true;
  options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private teamServce: TeamService) { }


  onFixtureSubmit() {
    console.log("selected: ", this.selected)
    if (window.localStorage.length > 0) {
      let teamSearch = window.localStorage.getItem('search');
      if (typeof teamSearch === 'string') {
        let obj: string[] = JSON.parse(teamSearch);
        let teamId = obj[1];
        this.fetchFixtures(teamId, this.selected, this.futureFixture);
      }
    }
  }

  onRadioChange(type: string) {
    if (type === 'upcoming') this.futureFixture = true;
    else if (type === 'previous') this.futureFixture = false;
    console.log("futureFixture?: ", this.futureFixture)
  }

  ngOnInit(): void {}

  fetchFixtures(teamId: string, count: number, futureFixture: boolean){
    if(futureFixture){
      this.subscription = this.teamServce.getUpcomingFixtures(teamId, count).subscribe(data => {
        this.fixtures = data.response;
        console.log("upcoming fixtures: ", this.fixtures)
      });
    } else {
      this.subscription = this.teamServce.getPastFixtures(teamId, count).subscribe(data => {
        this.fixtures = data.response;
        console.log("previous fixtures: ", this.fixtures)

      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
    
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { CommonModule } from '@angular/common';
// import { TeamService } from 'src/app/services/team.service';

// @Component({
//   selector: 'app-fixture',
//   templateUrl: './fixture.component.html',
//   styleUrls: ['./fixture.component.css']
// })
// export class FixtureComponent implements OnInit {
//   private subscription!: Subscription;

//   Teams!: any[];
//   league!: string;
//   teamSearched!: string;
//   constructor(private teamServce: TeamService) { }

//   ngOnInit(): void {
//     if (window.localStorage.length > 0) {
//       let teamSearch = window.localStorage.getItem('search');
//       if (typeof teamSearch === 'string') {
//         let obj: string[] = JSON.parse(teamSearch);
//         let teamId = obj[1];
//         let teamName = obj[0];
//         this.teamSearched = teamId;
//         this.fetchFixtures(teamId,5,true);
//       }
//     }
//   }

//   fetchFixtures(teamId: string, count: number, futureFixture: boolean){
//     var homeTeam;
//     var awayTeam;
//     if(futureFixture){
//       this.subscription = this.teamServce.getUpcomingFixtures(teamId, count).subscribe(data => {
//         for(var i = 0; i < data.response.length; i++){
//         homeTeam = data.response[i].teams.home;
//         awayTeam = data.response[i].teams.away;
//         if(!this.Teams){
//           this.Teams = [{homeTeam, awayTeam}];
//         } else {
//         this.Teams.push({homeTeam, awayTeam});
//         }
//         console.log(this.Teams);
//       }
//       });
//     } else {
//       this.subscription = this.teamServce.getPastFixtures(teamId, count).subscribe(data => {
        
//       });
//     }
//   }
// }



