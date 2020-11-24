import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rGameNode';

  get username():string {
    return this.authSvc.username;
  }

  get loggedIn():boolean{
    return this.authSvc.loggedIn;
  }

  constructor(public authSvc:AuthService) {
    authSvc.authorize();
  }

  signout(){
    this.authSvc.logout();
    return false;
  }

  customize(){

  }

}
