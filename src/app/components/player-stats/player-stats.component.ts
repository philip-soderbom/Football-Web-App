import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {
  @Input() competitions: any[] = [];
  @Input() data: any[] = [];

  compChosen: boolean = false;
  isTotal: boolean = false;
  competition!: string;
  competitionLogo!: string;
  stats!: any[];

  playerName!: string;

  constructor() { }

  ngOnInit(): void {}


  competitionHandler(comp: string) {
    console.log(comp)
    this.compChosen = true;
    this.isTotal = false;
    let index = this.competitions.findIndex(competition => competition === comp)
    console.log(index)
    let stat = this.data[index];

    this.competition = stat.league.name;
    this.competitionLogo = stat.league.logo;
    this.stats = [
      ["Appearences", stat.games.appearences],
      ["Minutes played", stat.games.minutes],
      ["Goals scored", stat.goals.total],
      ["Assists provided", stat.goals.assists],
      ["Passes", stat.passes.total],
      ["Key passes", stat.passes.key],
      ["Yellow cards", stat.cards.yellow],
      ["Red cards", stat.cards.red],
      ["Tackles", stat.tackles.total],
      ["Interceptions", stat.tackles.interceptions],
      ["Attempted dribbles", stat.dribbles.attempts],
      ["Successful dribbles", stat.dribbles.success]
    ];

  }

  sumStats() {
    let sumAppearences = 0;
    let sumMins = 0;
    let sumGoals = 0;
    let sumAssists = 0;
    let sumPasses = 0;
    let sumKeyPasses = 0;
    let sumRed = 0;
    let sumYellow = 0;
    let sumTackles = 0;
    let sumInterceptions = 0;
    let sumAttDribbles = 0;
    let sumSuccDribbles = 0;

    this.isTotal = true;

    for (let i = 0; i < this.competitions.length; i++) {
      let stat = this.data[i];      
    
      sumAppearences += stat.games.appearences;
      sumMins += stat.games.minutes;
      sumGoals += stat.goals.total;
      sumAssists += stat.goals.assists;
      sumPasses += stat.passes.total;
      sumKeyPasses += stat.passes.key;
      sumYellow += stat.cards.yellow;
      sumRed += stat.cards.red;
      sumTackles += stat.tackles.total;
      sumInterceptions += stat.tackles.interceptions;
      sumAttDribbles += stat.dribbles.attempts;
      sumSuccDribbles += stat.dribbles.success;
    }

    this.stats = [
      ["Appearences", sumAppearences],
      ["Minutes played", sumMins],
      ["Goals scored", sumGoals],
      ["Assists provided", sumAssists],
      ["Passes", sumPasses],
      ["Key passes", sumKeyPasses],
      ["Yellow cards", sumYellow],
      ["Red cards", sumRed],
      ["Tackles", sumTackles],
      ["Interceptions", sumInterceptions],
      ["Attempted dribbles", sumAttDribbles],
      ["Successful dribbles", sumSuccDribbles]
    ];
  }

}
