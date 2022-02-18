import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Team } from '../interfaces/Team'
import { Squad } from '../interfaces/Squad'

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
    // edit API url from function input
    let editUrl = this.apiBaseURL.concat('teams?name=' + search)
    return this.http.get<Team>(editUrl, httpOptions);
  }

  getSquad(search: string): Observable<Squad> {
    let editUrl = this.apiBaseURL.concat('players/squads?team=' + search)
    return this.http.get<Squad>(editUrl, httpOptions)
  }
}
