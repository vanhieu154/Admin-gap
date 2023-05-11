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
import { LackInforDialogComponentComponent } from '../lack-infor-dialog-component/lack-infor-dialog-component.component';
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
  types=["Giảm Giá","Đồng Giá"]
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



    putPromotion()  {
      // this.fashion.Mota=this.fashion.Mota.replace(/<\/?p>/gi, '');
      // this.promotion.cDate= new Date(Date.now())
      if (!this.promotion.Ngaybatdau || !this.promotion.Ngayketthuc || !this.promotion.Mota || !this.promotion.Gia || !this.promotion.LoaiPromotion || this.promotion.Hinhanh == '' || !this.promotion.TenPromotion) {
        // Nếu không có giá trị, hiển thị thông báo lỗi và dừng hàm postProduct
        const dialogRef = this.dialog.open(LackInforDialogComponentComponent, {
          width: '417px',
          height: '220px',
        });
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['updatepromotion/:id'])
        });
        return;
      }
      this.promotion.SanphamApdung=this.selectedProducts
      this._service.putPromotion( this.promotion).subscribe({
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
  checkPrice() {
    if (this.promotion.Gia < 500) {
      // Nếu giá trị không hợp lệ, hiển thị thông báo lỗi
      const dialogRef = this.dialog.open(LackInforDialogComponentComponent, {
        width: '417px',
        height: '220px',
      });
      dialogRef.afterClosed().subscribe(() => {
        this.promotion.Gia = 0
        this.router.navigate(['updatepromotion/:id'])

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

  // showSelectedProducts() {
  //   if (this.selectedProducts.length > 0) {
  //     const selectedProductsHtml = this.selectedProducts.map(product => {
  //       return `
  //         <tr>
  //           <td style="font-size:1rem; padding-right: 20px">${product.MaSP}</td>
  //           <td style="width: 100px"><img style="max-height: 40%; max-width: 40%; text-align: center;" src="${product.Hinhanh[0]}" /></td>
  //           <td style="margi"> ${product.TenSP} </td>
  //         </tr>
  //       `;
  //     }).join('');

  //     const html = `
  //       <table class="product-table">
  //         <thead>
  //           <tr style="font-size:1rem">
  //             <th>Mã </th>
  //             <th>Hình ảnh</th>
  //             <th>Tên sản phẩm</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           ${selectedProductsHtml}
  //         </tbody>
  //       </table>
  //     `;

  //     this.selectedProductsDiv.nativeElement.innerHTML = html;
  //   } else {
  //     // If there are no selected products, clear the HTML
  //     this.selectedProductsDiv.nativeElement.innerHTML = '';
  //   }
  // }

  // ngAfterViewInit() {
  //   this.showSelectedProducts();
  // }

}
