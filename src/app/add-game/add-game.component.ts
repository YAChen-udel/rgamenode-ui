import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  addGameForm: FormGroup;
  loading=false;
  submitted=false;
  returnUrl: string;
  error: string;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute , private router: Router, private authSvc:AuthService, private gameSvc:GameService) {
    if (!authSvc.loggedIn)
      this.router.navigate(['/']);
   }

     ngOnInit(): void {
       this.addGameForm=this.formBuilder.group({
         name: ['',Validators.required]
       });
       this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/games';
     }

     addGame(){
       this.submitted=true;
       if (this.addGameForm.invalid){
         return;
       }
       this.loading=true;

       this.gameSvc.addGame(this.addGameForm.controls.name.value).subscribe(response=>{
         this.router.navigate([this.returnUrl]);
       },err=>{this.submitted=false;this.loading=false;this.error=err.message||err;});
     }

}
