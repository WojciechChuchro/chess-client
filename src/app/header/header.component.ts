import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
    currentSelection: string = "home"

    onLinkClick(currentSelection: string): void {
        this.currentSelection = currentSelection
    }

}
