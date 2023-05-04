import { Component } from '@angular/core';
import { CouponApiService } from '../admin-coupon/coupon-api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Coupon } from '../admin-coupon/coupon';
import { FormControl, FormGroup } from '@angular/forms';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
  selectedFiles: File[] = [];
  errMessage:string=''
  constructor(public _service: CouponApiService, private http: HttpClient,private router:Router,public dialog: MatDialog){
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

  onDeleteImage(index: number) {
    this.coupon.Hinhanh.splice(index, 1);
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  toMainCouponPage(){
    this.router.navigate(['coupons'])
      }
}
