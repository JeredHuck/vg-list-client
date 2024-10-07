import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
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
