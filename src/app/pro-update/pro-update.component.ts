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
  selector: '[app-pro-update]',
  templateUrl: './pro-update.component.html',
  styleUrls: ['./pro-update.component.css']
})
export class ProUpdateComponent {
  public Editor = ClassicEditor;
  selectPromotionId: string='';
  promotion=new Promotion();
  promotions:any;
  productpromotions:any;
  products:any;
  product=new Product();
  id: any;
  errMessage:string='';
  types=["Giảm giá loại sản phẩm","Đồng giá"]
  constructor(public _service: PromotionService,private _pservice: ProductApiService, private http: HttpClient,private router:Router, public dialog: MatDialog,private activateRoute:ActivatedRoute){

    activateRoute.paramMap.subscribe(
      (param)=>{
        this.id=param.get('id')
        if(this.id!=null)
        {
          this._service.getPromotion(this.id).subscribe({
            next:(data)=>{this.promotion=data},
            error:(err)=>{this.errMessage=err}
          })
          this._service.getProductPromotion(this.id).subscribe({
            next:(data)=>{this.productpromotions=data},
            error:(err)=>{this.errMessage=err}
          })
        }
      }
    )
    }

    selectedProducts: any[] = [];

    putPromotion()  {
      let put=[]
      // this.fashion.Mota=this.fashion.Mota.replace(/<\/?p>/gi, '');
      // this.promotion.cDate= new Date(Date.now())
      put.push(this.promotion)
      put.push(this.selectedProducts)
      console.log(put[0]);

      this._service.putPromotion(put).subscribe({
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
  // putPromotion()
  //  {
  //   this.promotion.cDate= new Date(Date.now())
  //   this._service.putPromotion(this.promotion).subscribe({
  //     next:(data)=>{this.promotions=data},
  //     error:(err)=>{this.errMessage=err}

  //   })
  //   const dialogRef = this.dialog.open(SuccessDialogComponent, {
  //     width: '417px',
  //     height: '220px',
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.router.navigate(['promotions'])
  //   });
  //  }



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

  toMainPromotionPage(){
    this.router.navigate(['promotions'])
      }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

}
