import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private path='http://localhost:3000/api'

  constructor(private httpClient: HttpClient) { }

  public getGames() {
    return this.httpClient.get(`${this.path}/browse/all`);
  }

  public getCreator(userID: string) {
    return this.httpClient.get(`${this.path}/security/public/${userID}`);
  }

  public getGameByID(gameID: string) {
    return this.httpClient.get(`${this.path}/game/${gameID}`);
  }


}
