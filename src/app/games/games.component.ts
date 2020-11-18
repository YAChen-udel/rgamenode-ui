import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service'


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  allgames = [];

  constructor(private api: GameService) {}

  ngOnInit() {
    this.api.getGames().subscribe((data) => {
      console.log(data);
      this.allgames = data["data"];
    })
  }

}
