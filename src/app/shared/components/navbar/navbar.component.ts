import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ZIndexService } from '../../../core/services/z-index-service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgStyle],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public navbarVisibility: boolean = false;
  zIndex!: number;

  constructor(private zIndexService: ZIndexService) {}

  ngOnInit() {
    this.zIndexService.setZIndex('navbar', 10);
    this.zIndex = this.zIndexService.getZIndex('navbar');
  }

  toggleNavbar() {
    this.navbarVisibility = !this.navbarVisibility;
    setTimeout(() => {
      const options = document.querySelectorAll('.option-select, .search-icon');
      options.forEach((element: Element) => {
        const option = element as HTMLElement;
        option.style.opacity = this.navbarVisibility ? '1' : '0';
      });
    });
  }

  isNavbarVisible() {
    return this.navbarVisibility;
  }
}
