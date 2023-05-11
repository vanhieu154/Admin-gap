import { Component, ElementRef, ViewChild } from '@angular/core';
import { CouponApiService } from '../admin-coupon/coupon-api.service';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Coupon } from '../admin-coupon/coupon';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../admin-product/product';
import { ProductApiService } from '../admin-product/product-api.service';
import { LackInforDialogComponentComponent } from '../lack-infor-dialog-component/lack-infor-dialog-component.component';
@Component({
  selector: '[app-c-update]',
  templateUrl: './c-update.component.html',
  styleUrls: ['./c-update.component.css']
})
export class CUpdateComponent {
  public Editor = ClassicEditor;
  types=["Giảm %","Giảm K"]
  selectCouponId: string='';
  coupon=new Coupon();
  coupons:any;
  products:any;
  product=new Product();
  // selectedFiles: File[] = [];
  errMessage:string='';
  id: any;
constructor(public _service: CouponApiService,private _pservice: ProductApiService, private http: HttpClient,private router:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute){
  activateRoute.paramMap.subscribe(
    (param)=>{
      this.id=param.get('id')
      if(this.id!=null)
      {
        this._service.getCoupon(this.id).subscribe({
          next:(data)=>{this.coupon=data},
          error:(err)=>{this.errMessage=err}
        })

      }
    }
  )
  this._service.getCoupons().subscribe({
   next:(data)=>{this.coupons=data},
   error:(err)=>{this.errMessage=err}
 })

  }


putCoupon()

 {
  if (!this.coupon.Ngaybatdau || !this.coupon.Ngayketthuc || !this.coupon.Soluong || !this.coupon.Giatrigiam || !this.coupon.TenCoupon || !this.coupon.Dieukiengiam || this.coupon.Hinhanh == '' ) {
    // Nếu không có giá trị, hiển thị thông báo lỗi và dừng hàm postProduct
    const dialogRef = this.dialog.open(LackInforDialogComponentComponent, {
      width: '417px',
      height: '220px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['newcoupon'])
    });
    return;
  }
  this.coupon.cDate= new Date(Date.now())
  this._service.putCoupon(this.coupon).subscribe({
    next:(data)=>{this.coupons=data},
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
  let file = event.target.files[0];
let reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = function () {
coupon.Hinhanh=reader.result!.toString()
};
reader.onerror = function (error) {
console.log('Error: ', error);
};
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

 range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});
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



 toMainCouponPage(){
  this.router.navigate(['coupons'])
    }
}
