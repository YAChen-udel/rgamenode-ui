import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';
import { CommunityHomeComponent } from './community-home/community-home.component';
import { AddGameComponent } from './add-game/add-game.component';
import { ProfileComponent } from './profile/profile.component';
import { EditGameComponent } from './edit-game/edit-game.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'about',component: AboutComponent},
  {path:'games',component: GamesComponent},
  {path:'games/:gameID',component: GameComponent},
  {path:'games/:gameID/edit-game', component: EditGameComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-pw', component: ForgotPwComponent},
  {path: 'community', component: CommunityHomeComponent},
  {path: 'add-game', component: AddGameComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
