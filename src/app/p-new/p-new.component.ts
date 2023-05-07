import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Product } from '../admin-product/product';
import { ProductApiService } from '../admin-product/product-api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: '[app-p-new]',
  templateUrl: './p-new.component.html',
  styleUrls: ['./p-new.component.css'],
})
export class PNewComponent {
  public Editor = ClassicEditor;
  Brands = ["ZARA", "LABB", "H&M", "JUNO", "SHEIN"];
  types=["Váy","Áo","Phụ kiện","Quần"];


  selectProductId: string='';
  // product: Product | undefined;
  product: Product = new Product();
  products:any;
  selectedFiles: File[] = [];
  errMessage:string=''
  constructor(public _service: ProductApiService, private http: HttpClient,private router:Router, public dialog: MatDialog){
  this._service.getProducts().subscribe({
  next:(data)=>{this.products=data},
  error:(err)=>{this.errMessage=err}
  })
}



postProduct()  {
  // this.fashion.Mota=this.fashion.Mota.replace(/<\/?p>/gi, '');
  this.product.MaSP=this.products.length+1;
  this.product.cDate= new Date()
  this._service.postProduct(this.product).subscribe({
    next:(data)=>{this.product=data},
    error:(err)=>{this.errMessage=err}
  })
  const dialogRef = this.dialog.open(SuccessDialogComponent, {
    width: '417px',
    height: '220px',
  });
  dialogRef.afterClosed().subscribe(() => {
    this.router.navigate(['adproducts'])
  });
}
onFileSelected(event: any,product:Product) {
  // let me = this;
  let files = event.target.files;
  for(let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = function () {
      product.Hinhanh.push(reader.result!.toString());
    };


    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}

onDeleteImage(index: number) {
  this.product.Hinhanh.splice(index, 1);
}

range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});


toMainProductPage(){
  this.router.navigate(['adproducts'])
    }
}
