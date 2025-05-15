import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ModalComponent } from './new-list-modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../../core/services/databse-service';
import { provideHttpClient } from '@angular/common/http';

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
    private databaseService: DatabaseService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.databaseService.getLists().subscribe((lists) => {
      console.log(lists);
    });
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
