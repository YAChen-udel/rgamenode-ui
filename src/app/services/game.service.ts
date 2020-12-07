import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private path='http://localhost:3000/api'

  constructor(private httpClient: HttpClient, private authSvc: AuthService) { }

  public getGames() {
    return this.httpClient.get(`${this.path}/browse/all`);
  }

  public getGameByID(gameID: string) {
    return this.httpClient.get(`${this.path}/game/${gameID}`);
  }

  public addGame(name: string, description: string) {
    return this.httpClient.post(`${this.path}/game`, {
      name: name,
      description: description,
      userID: this.authSvc.CurrentUserID._getNow
    });
  }

}
