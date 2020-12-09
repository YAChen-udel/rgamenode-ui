import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
	allgames = [];
	featuredGame;
	SafePipe;
	get loggedIn():boolean{
		return this.authSvc.loggedIn;
	}

	constructor(public authSvc:AuthService, private api:GameService) {
		authSvc.authorize();
	}

	ngOnInit() {
		this.api.getGames().subscribe((data) => {
			console.log(data);
			this.allgames = data["data"];
			//this.allgames.forEach((item:any)=>
			//	this.getUser(item.creator).subscribe(result=>item.user=result)
			//);
			this.featuredGame = this.allgames.pop();
			if (this.allgames.length >= 12) {
				this.allgames = this.allgames.reverse().slice(0,12);
			} else if (this.allgames.length < 12) {
				let dummyGame = {
					"name": "dummy",
				}
				let count = 12 - this.allgames.length
				while(count > 0) {
					this.allgames.push(dummyGame);
					count = count - 1;
				}
			}
		})
	}

	getUser(userID) {
		console.log(this.authSvc.getUser(userID));
		return this.authSvc.getUser(userID);
	}

	checkDummy(aGame) {
		return aGame.name !== "dummy";
	}
}
