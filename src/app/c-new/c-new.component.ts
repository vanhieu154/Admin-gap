import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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


  onCouponValueIncrease() {
    if (this.coupon.Giatrigiam < 100) {
      this.coupon.Giatrigiam++;
    }
  }

  onCouponValueDecrease() {
    if (this.coupon.Giatrigiam > 0) {
      this.coupon.Giatrigiam--;
    }
  }

  onCouponValueKeyPress(event: KeyboardEvent) {
    const couponValue = parseInt((event.target as HTMLInputElement).value.padStart(1 || 2));

    if (!isNaN(couponValue) && couponValue >= 10 && couponValue <= 100) {
      this.coupon.Giatrigiam = couponValue;
    }
    else {
      this.coupon.Giatrigiam = 0;
    }
  }
  couponValueIncreaseIntervalId: any;
  couponValueDecreaseIntervalId: any;
  couponValueChangeTimer: any;
  onCouponValueIncreaseStart(event: MouseEvent) {
    this.couponValueChangeTimer = setTimeout(() => {
      this.couponValueIncreaseIntervalId = setInterval(() => {
        this.onCouponValueIncrease();
      }, 100);
    }, 200);
  }

  onCouponValueDecreaseStart(event: MouseEvent) {
    this.couponValueChangeTimer = setTimeout(() => {
      this.couponValueDecreaseIntervalId = setInterval(() => {
        this.onCouponValueDecrease();
      }, 100);
    }, 200);
  }

  increaseCouponValue() {
    if (this.coupon.Giatrigiam < 100) {
      this.coupon.Giatrigiam++;
    }
  }

  decreaseCouponValue() {
    if (this.coupon.Giatrigiam > 0) {
      this.coupon.Giatrigiam--;
    }
  }


  onCouponValueEnd() {
    clearInterval(this.couponValueIncreaseIntervalId);
    clearInterval(this.couponValueDecreaseIntervalId);
    clearTimeout(this.couponValueChangeTimer);
  }

  onCouponValueIncreaseClick() {
    this.increaseCouponValue();
  }

  onCouponValueDecreaseClick() {
    this.decreaseCouponValue();
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


  @ViewChild('selectedProductsDiv') selectedProductsDiv!: ElementRef;
  selectedProducts: any[] = [];

  onCheckboxChange(event: any, product: any) {
    if (event.target.checked) {
      this.selectedProducts.push(product);
    } else {
      const index = this.selectedProducts.indexOf(product);
      this.selectedProducts.splice(index, 1);
    }
    this.showSelectedProducts();
  }
  showSelectedProducts() {
    const selectedProductsHtml = this.selectedProducts.map(product => {
      return `
        <tr>
          <td style="font-size:1rem; padding-right: 20px">${product.MaSP}</td>
          <td style="width: 100px"><img style="max-height: 40%; max-width: 40%; text-align: center;" src="${product.Hinhanh[0]}" /></td>
          <td style="margi"> ${product.TenSP} </td>
        </tr>
      `;
    }).join('');

    const html = `
      <table class="product-table">
        <thead>
          <tr style="font-size:1rem">
            <th>Mã </th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          ${selectedProductsHtml}
        </tbody>
      </table>
    `;

    this.selectedProductsDiv.nativeElement.innerHTML = html;
  }



  ngAfterViewInit() {
    this.showSelectedProducts();
  }


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  toMainCouponPage(){
    this.router.navigate(['coupons'])
      }
}
