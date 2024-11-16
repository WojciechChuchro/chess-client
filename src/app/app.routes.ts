import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: "game", component: GameComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "home", component: HomeComponent},
    {path: "", component: HomeComponent},
];
