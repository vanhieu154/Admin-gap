import { Component } from '@angular/core';
import { CouponApiService } from '../admin-coupon/coupon-api.service';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Coupon } from '../admin-coupon/coupon';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
  selectedFiles: File[] = [];
  errMessage:string='';
  id: any;
constructor(public _service: CouponApiService, private http: HttpClient,private router:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute){
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
    // refresh product list
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

 range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});

 onDeleteImage(index: number) {
  this.coupon.Hinhanh.splice(index, 1);
}


 toMainCouponPage(){
  this.router.navigate(['coupons'])
    }
}
