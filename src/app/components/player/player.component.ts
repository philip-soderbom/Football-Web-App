import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  private subscription!: Subscription;

  playerId!: number;
  playerIdString!: string;

  name!: string;
  firstname!: string;
  lastname!: string;
  age!: number;
  birthDate!: string;
  birthPlace!: string;
  birthCountry!: string;
  nationality!: string;
  height!: string;
  weight!: string;
  injured!: boolean;
  photo!: string;

  data!: any[];
  validPlayerId!: boolean;
  fetchDone: boolean = false;

  competitions: string[] = [];


  constructor(private activatedRoute: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let param: string = params['id'];
      let fixedParam: string = param.slice(1, param.length)
      this.playerIdString = fixedParam;
      this.playerId = Number.parseInt(fixedParam);
      
    })
    this.fetchPlayer(this.playerIdString);

  }

  fetchPlayer(search: string): void {
    this.subscription = this.teamService.getPlayer(search).subscribe(data => {
      if (data.response[0] !== undefined) {
        this.validPlayerId = true;
        this.fetchDone = true;

        console.log("player fetched: ", data.response[0])
        let player = data.response[0].player
        
        this.name = player.name;
        this.firstname = player.firstname;
        this.lastname = player.lastname;
        this.age = player.age;
        this.birthDate = player.birth.date;
        this.birthPlace = player.birth.place;
        this.birthCountry = player.birth.country
        this.nationality = player.nationality;
        this.height = player.height;
        this.weight = player.weight;
        this.injured = player.injured;
        this.photo = player.photo;

        //stats
        let stats = data.response[0].statistics
        console.log("to be passed to child: ", stats)
        this.data = stats;

        stats.map((comp, i) => {
          if (i < 3) {
            this.competitions.push(comp.league.name)
          }
        })
      }
      else {
        this.validPlayerId = false;
        this.fetchDone = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
