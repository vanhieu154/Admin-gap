import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: '[app-admin-product]',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {
  public searchProduct:string=''

    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });


    public checkboxAllValue: boolean = false;
  public checkboxDetailValue: boolean = false;


  public updateCheckboxDetailValue(): void {
    this.checkboxDetailValue = this.checkboxAllValue;
  }


  public updateCheckboxAllValue(): void {
    if (!this.checkboxDetailValue) {
      this.checkboxAllValue = false;
    }
  }

  onClear(): void{
    this.searchProduct = ''

  }


  activeContent = 'content1';
  showContent(content: string): void {
          this.activeContent = content;
  }
}






