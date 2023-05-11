import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lack-image-dialog',
  templateUrl: './lack-image-dialog.component.html',
  styleUrls: ['./lack-image-dialog.component.css']
})
export class LackImageDialogComponent {
  constructor(public dialogRef: MatDialogRef<LackImageDialogComponent>) {}
}

