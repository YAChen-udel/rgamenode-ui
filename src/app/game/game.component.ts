import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
// import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  isLoaded = false;
  game;
  name;
  creatorID;
  ownerID;
  creator;
  owner;
  creditIDs;
  creditNames = [];
  thumbnail;
  gamefiles;  //Not sure how this piece is gonna be implemented yet but we'll figure it out
  gameID:string;
  SafePipe;

  constructor(private route: ActivatedRoute, private api: GameService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getGameByID(params.get('gameID'));
    });
  }

  getGameByID(gameID: string) {
    this.api.getGameByID(gameID).subscribe((data) => {
      //console.log(data)
      this.game = data["data"];
	  this.gameID = `http://localhost:8080/${this.game["_id"]}/game.html`;
	  console.log(this.gameID);
      //console.log(this.game)
      this.name = this.game["name"];
      //console.log(this.name);
      this.creditIDs = this.game["credits"];
      for(let credit of this.creditIDs) {
        //console.log(credit["id"]);
        this.authSvc.getUser(credit["id"]).subscribe((data) => {
          //console.log('credit data -->', data);
          this.creditNames.push(data["data"]);
          //console.log(this.creditNames);
    })}
    this.isLoaded = true;
  })
}
}
