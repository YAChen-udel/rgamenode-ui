import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  mygames = [{'title':'game1', 'pic':'assets/img/0986f97be719fb9a.jpg', 'gameId':'1'},{'title':'game2', 'pic':'assets/img/6fe407b4b13bbcde.jpg', 'gameId':'2'},{'title':'game3', 'pic':'assets/img/8a26974ee6444acd.jpg', 'gameId':'3'}];
  photo = {
    style: {
      width: '200px',
      height: '200px'
    }
  };

  constructor() {
  }

  ngOnInit(): void {}

}
