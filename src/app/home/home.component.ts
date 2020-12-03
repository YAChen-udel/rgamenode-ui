import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  get loggedIn():boolean{
    return this.authSvc.loggedIn;
  }

  constructor(public authSvc:AuthService) {
    authSvc.authorize();
  }

  ngOnInit(): void {
  }

}
