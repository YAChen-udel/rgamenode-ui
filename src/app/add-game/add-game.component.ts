import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  constructor(private router: Router,private authSvc:AuthService) {
    if (!authSvc.loggedIn)
      this.router.navigate(['/']);
   }

  ngOnInit(): void {
  }

}
