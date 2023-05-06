import { Component } from '@angular/core';
import { CouponApiService } from '../admin-coupon/coupon-api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Coupon } from '../admin-coupon/coupon';
import { FormControl, FormGroup } from '@angular/forms';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../admin-product/product';
import { ProductApiService } from '../admin-product/product-api.service';
@Component({
  selector: '[app-c-new]',
  templateUrl: './c-new.component.html',
  styleUrls: ['./c-new.component.css']
})
export class CNewComponent {
  public Editor = ClassicEditor;
  types=["Giảm %","Giảm K"]
  selectCouponId: string='';
  coupon=new Coupon();
  coupons:any;
  products:any;
  product=new Product();
  selectedFiles: File[] = [];
  errMessage:string=''
  constructor(public _service: CouponApiService,private _pservice: ProductApiService, private http: HttpClient,private router:Router,public dialog: MatDialog){
  this._service.getCoupons().subscribe({
  next:(data)=>{this.coupons=data},
  error:(err)=>{this.errMessage=err}
  })


  }

  postCoupon()  {
    this.coupon.MaCoupon=this.coupons.length+1;
    this.coupon.cDate= new Date(Date.now())
    this._service.postCoupon(this.coupon).subscribe({
      next:(data)=>{this.coupon=data},
      error:(err)=>{this.errMessage=err}

    })
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '417px',
      height: '220px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['coupons'])

    });
  }
  onFileSelected(event: any,coupon:Coupon) {
    let files = event.target.files;
    for(let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function () {
        coupon.Hinhanh.push(reader.result!.toString());
      };

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }

  }

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


  toMainCouponPage(){
    this.router.navigate(['coupons'])
      }
}
