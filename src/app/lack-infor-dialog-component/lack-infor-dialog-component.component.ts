import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: '[app-lack-infor-dialog-component]',
  templateUrl: './lack-infor-dialog-component.component.html',
  styleUrls: ['./lack-infor-dialog-component.component.css']
})
export class LackInforDialogComponentComponent {
  constructor(public dialogRef: MatDialogRef< LackInforDialogComponentComponent>) {}
}
