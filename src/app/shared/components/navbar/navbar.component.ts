import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public sidebarVisibility:boolean = false;

  toggleSidebar() {
    this.sidebarVisibility = !this.sidebarVisibility
  }

  isSidebarVisible() {
    return this.sidebarVisibility
  }

}
