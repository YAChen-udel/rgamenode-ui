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
	name;
	creatorID;
	ownerID;
	creator;
	owner;
	creditIDs;
	creditNames = [];
	thumbnail;
	gamefiles;  //Not sure how this piece is gonna be implemented yet but we'll figure it out
	hasBaseDropZoneOver:boolean;
	hasAnotherDropZoneOver:boolean;
	uploader;
	response:string;

	constructor(private route: ActivatedRoute, private api: GameService, private authSvc: AuthService) {
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.getGameByID(params.get('gameID'));
		});
		this.uploader = new FileUploader({
			url: `https://localhost:3000/api/game/${this.game._id}/upload`,
			disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
			formatDataFunctionIsAsync: true,
			formatDataFunction: async (item) => {
				return new Promise( (resolve, reject) => {
					resolve({
						name: item._file.name,
						length: item._file.size,
						contentType: item._file.type,
						date: new Date()
					});
				});
			}
		});

		this.hasBaseDropZoneOver = false;
		this.hasAnotherDropZoneOver = false;

		this.response = '';

		this.uploader.response.subscribe( res => this.response = res );
	}

	getGameByID(gameID: string) {
		this.api.getGameByID(gameID).subscribe((data) => {
			console.log(data)
			this.game = data["data"];
			console.log(this.game)
			this.name = this.game["name"];
			console.log(this.name);
			this.creditIDs = this.game["credits"];
			for(let credit of this.creditIDs) {
				console.log(credit["id"]);
				this.authSvc.getUser(credit["id"]).subscribe((data) => {
					console.log('credit data -->', data);
					this.creditNames.push(data["data"]);
					console.log(this.creditNames);
				})}
				this.isLoaded = true;
			})
		}

		public fileOverBase(e:any):void {
			this.hasBaseDropZoneOver = e;
		}

		public fileOverAnother(e:any):void {
			this.hasAnotherDropZoneOver = e;
		}

	}
