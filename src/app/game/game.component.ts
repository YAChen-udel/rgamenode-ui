import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  game;
  name;
  creator;
  owner;
  thumbnail;
  gamefiles;  //Not sure how this piece is gonna be implemented yet but we'll figure it out


  constructor(private route: ActivatedRoute, private api: GameService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getGameByID(params.get('gameID'));
    });
  }

  getGameByID(gameID: string) {
    this.api.getGameByID(gameID).subscribe((data) => {
      console.log(data)
      this.game = data["data"];
      console.log(this.game)
      this.name = this.game["name"];
      console.log(this.name);
      this.creator = this.game["creator"];
      this.owner = this.game["owner"];
    })
  }

}
