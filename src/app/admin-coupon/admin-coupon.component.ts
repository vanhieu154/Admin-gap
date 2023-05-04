import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Coupon } from './coupon';
import { CouponApiService } from './coupon-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
@Component({
  selector: '[app-admin-coupon]',
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.css']
})
export class AdminCouponComponent {

  public Editor = ClassicEditor;
  types=["Giảm %","Giảm K"]
  selectCouponId: string='';
  coupon=new Coupon();
  coupons:any;
  selectedFiles: File[] = [];
  errMessage:string=''
  constructor(public _service: CouponApiService, private http: HttpClient,private router:Router, public dialog: MatDialog){
  this._service.getCoupons().subscribe({
  next:(data)=>{this.coupons=data},
  error:(err)=>{this.errMessage=err}
  })
  }

getCoupon() {
    const url = `http://localhost:4000/coupons/${this.selectCouponId}`;
    this.http.get<Coupon>(url).subscribe(data => {
      this.coupon = data;
    });
  }


deleteCoupon(id: string) {

  const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
    width: '417px',
    height: '220px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
  const url = `http://localhost:4000/coupons/${id}`;
  this.http.delete(url).subscribe({
    next: () => {
      // console.log(`Đã xóa sản phẩm với id=${id}`);
      this.coupons = this.coupons.filter((coupon: { _id: string; }) => coupon._id !== id);
    },
    error: (err) => {
      console.log(`Lỗi xóa sản phẩm với id=${id}: `, err);
    }
  });}

});
}

  filteredCoupons: any[] | undefined;
  filteredDate: any[] | undefined;


  filterCoupons() {
     this.filteredCoupons = this.coupons.filter((coupon:  {
      MaCoupon:string,
      TenCoupon:string,
      Soluong:number,
      Giatrigiam:number,
      Noidung:string,

      }) =>
    coupon.MaCoupon.toString().includes(this.searchCoupon.toLocaleLowerCase()) ||
    coupon.TenCoupon.toString().includes(this.searchCoupon) ||
    coupon.Soluong.toString().includes(this.searchCoupon)||
    coupon.Giatrigiam.toString().includes(this.searchCoupon)||
    coupon.Noidung.toString().includes(this.searchCoupon));
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit() {
    // Khởi tạo FormGroup cho range date picker
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }
  filterDate() {
    const start = this.range.value.start ?? new Date('2020-01-01');
    const end = this.range.value.end ?? new Date('2999-12-31');
    this.filteredDate = this.coupons.filter((coupon: { Ngaybatdau: string | number | Date; Ngayketthuc: string | number | Date; }) => {
      const Ngaybatdau = new Date(coupon.Ngaybatdau);
      const Ngayketthuc = new Date(coupon.Ngayketthuc);
      return Ngaybatdau >= start && Ngayketthuc <= end;
    });
  }
  onDeleteImage(index: number) {
    this.coupon.Hinhanh.splice(index, 1);
  }



  public searchCoupon:string=''





  onClear() {
    this.searchCoupon = '';
    this.filterCoupons();
 }

 toNewCouponPage(){
  this.router.navigate(['newcoupon'])
    }
  toUpdateCouponPage(a:any){
  this.router.navigate(['updatecoupon', a._id])
    }


}
