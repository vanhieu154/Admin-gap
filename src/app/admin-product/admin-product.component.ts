import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatInputModule} from '@angular/material/input';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { AfterViewInit, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

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






