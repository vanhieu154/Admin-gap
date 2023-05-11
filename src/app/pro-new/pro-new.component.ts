import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { LackImageDialogComponent } from '../lack-image-dialog/lack-image-dialog.component';
import { LackInforDialogComponentComponent } from '../lack-infor-dialog-component/lack-infor-dialog-component.component';
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
  types=["Giảm Giá","Đồng Giá"]



  constructor(public _service: PromotionService,private _pservice: ProductApiService, private http: HttpClient,private router:Router, public dialog: MatDialog,private activateRoute:ActivatedRoute){
    this._service.getPromotions().subscribe({
      next:(data)=>{this.promotions=data},
      error:(err)=>{this.errMessage=err}
      })


  }

postPromotion()  {
  // let post=[]
  // this.fashion.Mota=this.fashion.Mota.replace(/<\/?p>/gi, '');
  // this.promotion.cDate= new Date(Date.now())

  // post.push(this.promotion)
  // post.push(this.selectedProducts)
  // console.log(post[0]);
  if (!this.promotion.Ngaybatdau || !this.promotion.Ngayketthuc || !this.promotion.Mota || !this.promotion.Gia || !this.promotion.LoaiPromotion || this.promotion.Hinhanh == '' || !this.promotion.TenPromotion) {
    // Nếu không có giá trị, hiển thị thông báo lỗi và dừng hàm postProduct
    const dialogRef = this.dialog.open(LackInforDialogComponentComponent, {
      width: '417px',
      height: '220px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['newpromotion'])
    });
    return;
  }

  this.promotion.SanphamApdung=this.selectedProducts
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
onFileSelected(event: any,promotion:Promotion) {
  let file = event.target.files[0];
let reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = function () {
promotion.Hinhanh=reader.result!.toString()
};
reader.onerror = function (error) {
console.log('Error: ', error);
};
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

checkPrice() {
  if (this.promotion.Gia < 500) {
    // Nếu giá trị không hợp lệ, hiển thị thông báo lỗi
    const dialogRef = this.dialog.open(LackInforDialogComponentComponent, {
      width: '417px',
      height: '220px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.promotion.Gia = 0
      this.router.navigate(['newpromotion'])

    });
  }
}

@ViewChild('selectedProductsDiv', {static: false}) selectedProductsDiv!: ElementRef;
selectedProducts: any[] = [];

onCheckboxChange(event: any, product: any) {
  if (!product) return; // guard clause

  if (event.target.checked) {
    this.selectedProducts.push(product._id);
  } else {
    const index = this.selectedProducts.indexOf(product);
    this.selectedProducts.splice(index, 1);
  }

  // this.showSelectedProducts();
}


toMainPromotionPage(){
  this.router.navigate(['promotions'])
    }
  }




