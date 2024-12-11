import { Component, OnInit } from '@angular/core';
import { ZIndexService } from '../../core/guards/services/z-index-service';
import { NgStyle } from '@angular/common';
import { ModalComponent } from './new-list-modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  zIndex!: number;
  showModal = false;

  topGames: string[] = ['Zelda', 'Mario', 'Sonic'];

  constructor(
    private zIndexService: ZIndexService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.zIndexService.setZIndex('home', 5);
    this.zIndex = this.zIndexService.getZIndex('home');
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
