import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Promotion } from '../admin-promotion/Promotion';
import { PromotionService } from '../admin-promotion/promotion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../admin-product/product';
import { ProductApiService } from '../admin-product/product-api.service';
@Component({
  selector: 'app-pro-new',
  templateUrl: './pro-new.component.html',
  styleUrls: ['./pro-new.component.css']
})
export class ProNewComponent {
  public Editor = ClassicEditor;
  selectPromotionId: string='';
  promotion=new Promotion();
  promotions:any;
  products:any;
  product=new Product();
  id: any;
  errMessage:string='';
  types=["Giảm giá loại sản phẩm","Đồng giá"]



  constructor(public _service: PromotionService,private _pservice: ProductApiService, private http: HttpClient,private router:Router, public dialog: MatDialog,private activateRoute:ActivatedRoute){
    this._service.getPromotions().subscribe({
      next:(data)=>{this.promotions=data},
      error:(err)=>{this.errMessage=err}
      })
  }

postPromotion()  {
  // this.fashion.Mota=this.fashion.Mota.replace(/<\/?p>/gi, '');
  this.promotion.cDate= new Date(Date.now())
  this._service.postPromotion(this.promotion).subscribe({
    next:(data)=>{this.promotion=data},
    error:(err)=>{this.errMessage=err}
  })
  const dialogRef = this.dialog.open(SuccessDialogComponent, {
    width: '417px',
    height: '220px',
  });
  dialogRef.afterClosed().subscribe(() => {
    this.router.navigate(['promotions'])
  });
}

isInputFocused = false;

hideProducts() {
  if (!this.isInputFocused) {
    //Nếu không tập trung vào ô input nữa, đóng danh sách sản phẩm.
    console.log('Hide products');
    this.isInputFocused = true;
  }}

  displayTable = false;
  showTable() {
    this.displayTable = true;
    this.getProducts();
  }
  getProducts(){
    this._pservice.getProducts().subscribe({
      next:(data)=>{this.products=data;  },
      error:(err)=>{this.errMessage=err}
      })
  }


  filteredProducts: any[] | undefined;
  public searchProduct:string=''

  filterProducts() {
     this.filteredProducts = this.products.filter((product:  { MaSP: string; TenSP: string; Price: number;LoaiSP :string; }) =>
     product.MaSP.toString().includes(this.searchProduct.toLowerCase()) ||
     product.TenSP.toLowerCase().includes(this.searchProduct.toLowerCase()) ||
     product.LoaiSP.toLowerCase().includes(this.searchProduct.toLowerCase()) ||
     product.Price.toString().toLowerCase().includes(this.searchProduct.toLowerCase()));
  }

range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});


toMainPromotionPage(){
  this.router.navigate(['promotions'])
    }
  }




