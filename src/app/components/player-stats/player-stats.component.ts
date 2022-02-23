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
    let compStats = this.data[index];

    console.log("comp stats",compStats)

    this.competition = compStats.league.name;
    this.competitionLogo = compStats.league.logo;
    this.stats = [
      ["Appearences", compStats.games.appearences],
      ["Minutes played", compStats.games.minutes],
      ["Goals scored", compStats.goals.total],
      ["Assists provided", compStats.goals.assists],
      ["Passes", compStats.passes.total],
      ["Key passes", compStats.passes.key],
      ["Yellow cards", compStats.cards.yellow],
      ["Red cards", compStats.cards.red],
      ["Tackles", compStats.tackles.total],
      ["Interceptions", compStats.tackles.interceptions],
      ["Attempted dribbles", compStats.dribbles.attempts],
      ["Successful dribbles", compStats.dribbles.success]
    ];

    // check for null or undefined stat
    this.stats.forEach((stat, i) => {
      if (stat[1] === null || stat[1] === undefined) {
        this.stats[i][1] = 0
      }
    })

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
