import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public sidebarVisibility:boolean = false;

  toggleSidebar() {
    this.sidebarVisibility = !this.sidebarVisibility;
  }

  isSidebarVisible() {
    return this.sidebarVisibility;
  }

}
