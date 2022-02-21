import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Team } from '../interfaces/Team'
import { Squad } from '../interfaces/Squad'
import { Player } from '../interfaces/Player';

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
}
