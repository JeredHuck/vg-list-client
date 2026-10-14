import { Component, OnInit } from '@angular/core';
import { ZIndexService } from '../../core/services/z-index-service';
import { ModalComponent } from './new-list-modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../../core/services/databse-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
    private dbService: DatabaseService,
  ) {}

  ngOnInit() {
    this.zIndexService.setZIndex('home', 5);
    this.zIndex = this.zIndexService.getZIndex('home');
    this.dbService.getUserLists(1).subscribe({
      next: (lists) => console.log('Lists fetched successfully:', lists),
      error: (error) => console.error('Error fetching lists:', error),
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
