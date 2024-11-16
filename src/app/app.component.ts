// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl:  './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [RouterModule, HeaderComponent]
})
export class AppComponent {}
