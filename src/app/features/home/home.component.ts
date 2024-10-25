import { Component, OnInit } from '@angular/core';
import { ZIndexService } from '../../core/guards/services/z-index-service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  zIndex!: number;

  topGames: string[] = ['Zelda', 'Mario', 'Sonic'];

  constructor(private zIndexService: ZIndexService) {}

  ngOnInit() {
    this.zIndexService.setZIndex('home', 5);
    this.zIndex = this.zIndexService.getZIndex('home');
  }
}
