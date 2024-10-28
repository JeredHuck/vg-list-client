import { Component, OnInit } from '@angular/core';
import { ZIndexService } from '../../core/guards/services/z-index-service';
import { NgStyle } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  zIndex!: number;
  showModal = false;

  topGames: string[] = ['Zelda', 'Mario', 'Sonic'];

  constructor(private zIndexService: ZIndexService) {}

  ngOnInit() {
    this.zIndexService.setZIndex('home', 5);
    this.zIndex = this.zIndexService.getZIndex('home');
  }

  openModal() {
    this.showModal = true;
  }
}
