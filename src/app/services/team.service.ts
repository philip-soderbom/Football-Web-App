import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Team } from '../interfaces/Team'
import { Squad } from '../interfaces/Squad'
import { Player } from '../interfaces/Player';
import { League } from '../interfaces/League';
import { Standings } from '../interfaces/Standings';
import { Fixtures } from '../interfaces/Fixtures';

const httpOptions = {
  headers: new HttpHeaders({
    'x-apisports-key': 'acc4daee275c06e9080eab9c2e614aa6',
  }),
}

@Injectable({
  providedIn: 'root'
})


export class TeamService {
  private apiBaseURL = 'https://v3.football.api-sports.io/';

  constructor(private http: HttpClient) { }


  getTeam(search: string): Observable<Team> {
    let url = this.apiBaseURL.concat('teams?name=' + search)
    return this.http.get<Team>(url, httpOptions);
  }

  getSquad(search: string): Observable<Squad> {
    let url = this.apiBaseURL.concat('players/squads?team=' + search)
    return this.http.get<Squad>(url, httpOptions)
  }

  getPlayer(search: string): Observable<Player> {
    let url = this.apiBaseURL.concat('players?id=' + search + '&season=2021')
    return this.http.get<Player>(url, httpOptions)
  }

  getLeague(teamId: string): Observable<League> {
    let url = this.apiBaseURL.concat('leagues?team=' + teamId + '&season=2021&type=league')
    return this.http.get<League>(url, httpOptions)
  }

  getStandings(leagueId: string): Observable<Standings> {
    let url = this.apiBaseURL.concat('standings?season=2021&league=' + leagueId)
    return this.http.get<Standings>(url, httpOptions)

  }
  getUpcomingFixtures(teamId: string, next: number){
    let url = this.apiBaseURL.concat('fixtures?season=2021&team='+teamId+'&next=' + next);
    return this.http.get<Fixtures>(url, httpOptions)
  }
  getPastFixtures(teamId: string, past: number){
    let url = this.apiBaseURL.concat('fixtures?season=2021&team='+teamId+'&last=' + past);
    return this.http.get<Fixtures>(url, httpOptions)
  }
}
