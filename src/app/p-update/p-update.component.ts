import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Product } from '../admin-product/product';
import { ProductApiService } from '../admin-product/product-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LackInforDialogComponentComponent } from '../lack-infor-dialog-component/lack-infor-dialog-component.component';
import { LackImageDialogComponent } from '../lack-image-dialog/lack-image-dialog.component';
@Component({
  selector: '[app-p-update]',
  templateUrl: './p-update.component.html',
  styleUrls: ['./p-update.component.css']
})
export class PUpdateComponent {
  public Editor = ClassicEditor;
  types=["Váy","Áo","Phụ kiện","Quần"]
  Brands = ["ZARA", "LABB", "H&M", "JUNO", "SHEIN"];
  Sizes = ["S", "M", "L", "XL", "Freesize"];
  selectProductId: string='';
  // product: Product | undefined;
  product=new Product();
  products:any;
  selectedFiles: File[] = [];
  errMessage:string=''
  id: any;
  constructor(public _service: ProductApiService, private http: HttpClient,private router:Router,private activateRoute:ActivatedRoute, public dialog: MatDialog){
    activateRoute.paramMap.subscribe(
      (param)=>{
        this.id=param.get('id')
        if(this.id!=null)
        {
          this._service.getProduct(this.id).subscribe({
            next:(data)=>{this.product=data},
            error:(err)=>{this.errMessage=err}
          })

        }
      }
    )
    this._service.getProducts().subscribe({
     next:(data)=>{this.products=data},
     error:(err)=>{this.errMessage=err}
   })
   }

   putProduct()
   {if (!this.product.TenSP || !this.product.Hinhanh || !this.product.LoaiSP || !this.product.Hang || !this.product.Price  || !this.product.Mota || !this.product.Soluong || !this.product.Size) {
    // Nếu không có giá trị, hiển thị thông báo lỗi và dừng hàm postProduct
    const dialogRef = this.dialog.open(LackInforDialogComponentComponent, {
      width: '417px',
      height: '220px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['updateproduct/:id'])
    });
    return;
  }
  if (this.product.Hinhanh.length < 1) {
    // Nếu không có ảnh nào được chọn, hiển thị thông báo lỗi và dừng hàm postProduct
    const dialogRef = this.dialog.open(LackImageDialogComponent, {
      width: '417px',
      height: '220px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['updateproduct/:id'])
    });
    return;
  }

      // this.product.Mota=this.product.Mota.replace(/<\/?p>/gi, '');
      this.product.cDate= new Date(Date.now())
      this._service.putProduct(this.product).subscribe({
       next:(data)=>{this.products=data},
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

  checkPrice() {
    if (this.product.Price < 1000) {
      // Nếu giá trị không hợp lệ, hiển thị thông báo lỗi
      const dialogRef = this.dialog.open(LackInforDialogComponentComponent, {
        width: '417px',
        height: '220px',
      });
      dialogRef.afterClosed().subscribe(() => {
        this.product.Price = 0
        this.router.navigate(['updateproduct/:id'])

      });
    }
  }

  toMainProductPage(){
    this.router.navigate(['adproducts'])

      }
}
