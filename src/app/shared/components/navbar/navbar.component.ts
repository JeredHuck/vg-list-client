import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ZIndexService } from '../../../core/guards/services/z-index-service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgStyle],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public sidebarVisibility: boolean = false;
  zIndex!: number;

  constructor(private zIndexService: ZIndexService) {}

  ngOnInit() {
    this.zIndexService.setZIndex('navbar', 10);
    this.zIndex = this.zIndexService.getZIndex('navbar');
  }

  toggleSidebar() {
    this.sidebarVisibility = !this.sidebarVisibility
    setTimeout(() => {
      const options = document.querySelectorAll('.option');
      options.forEach((element:Element) => {
        const option = element as HTMLElement;
        option.style.opacity = this.sidebarVisibility ? '1' : '0';
      })
    })
  }

  isSidebarVisible() {
    return this.sidebarVisibility;
  }
}
