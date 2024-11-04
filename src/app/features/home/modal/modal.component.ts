import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  gameList = new FormGroup({
    game1: new FormControl(''),
    game2: new FormControl(''),
    game3: new FormControl(''),
    game4: new FormControl(''),
    game5: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
