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
  currentGames = [];
  totalPages;
  pages = []
  page = 0;

  constructor(private api: GameService) {}


  ngOnInit() {
    this.api.getGames().subscribe((data) => {
      console.log(data);
      this.allgames = data["data"];
      this.currentGames = this.allgames.slice(0,12);
      this.totalPages = Math.ceil(this.allgames.length / 12);
      for (let i = 1; i <= this.totalPages; i++){
        this.pages.push(i);
      }
      console.log(this.pages);
    })
  }


  nextPage() { 
    if (this.page === this.totalPages -1) {
      return 0;
    } 
    else {
      this.page += 1;
      this.goTo(this.page);
    }
  }

  prevPage() {
    if (this.page === 0) {
      return 0;
    }
    else {
      this.page -= 1;
      this.goTo(this.page);
    }
  }

  goTo = function(page) {
    this.page = page;
    this.currentGames = this.allgames.slice(this.page*12, (this.page*12)+12);
  }
  



}
