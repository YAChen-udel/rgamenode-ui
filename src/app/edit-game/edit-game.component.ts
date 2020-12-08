import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
	selector: 'app-edit-game',
	templateUrl: './edit-game.component.html',
	styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {

	isLoaded = false;
	game;
	gameID:string;
	name;
	creatorID;
	ownerID;
	creator;
	owner;
	creditIDs;
	creditNames = [];
	thumbnail;
	hasBaseDropZoneOver: boolean;
	uploader: FileUploader;
	response: string;

	constructor(private route: ActivatedRoute, private api: GameService, private authSvc: AuthService) {
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.getGameByID(params.get('gameID'));
			this.gameID=params.get('gameID');
		});
		this.uploader = new FileUploader({
			url: `http://localhost:3000/api/game/${this.gameID}/upload`,
			authToken: this.authSvc.token
		});

		this.uploader.onBeforeUploadItem = (item) => {
  			item.withCredentials = false;
		}

		this.uploader.onAfterAddingFile = (item) => {
  			item.method = "PUT";
		}

		this.hasBaseDropZoneOver = false;

		this.response = '';

		this.uploader.response.subscribe( res => this.response = res );
		this.isLoaded = true;
	}

	getGameByID(gameID: string) {
		this.api.getGameByID(gameID).subscribe((data) => {
			console.log(data);
			this.game = data["data"];
			console.log(this.game);
			this.name = this.game["name"];
			this.creditIDs = this.game["credits"];
			for(let credit of this.creditIDs) {
				console.log(credit["id"]);
				this.authSvc.getUser(credit["id"]).subscribe((data) => {
					console.log('credit data -->', data);
					this.creditNames.push(data["data"]);
					console.log(this.creditNames);
				})}});
		}

		public fileOverBase(e:any):void {
			this.hasBaseDropZoneOver = e;
		}

	}
