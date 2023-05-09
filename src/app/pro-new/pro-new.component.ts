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
  types=["Giảm giá loại sản phẩm","Đồng giá"]



  constructor(public _service: PromotionService,private _pservice: ProductApiService, private http: HttpClient,private router:Router, public dialog: MatDialog,private activateRoute:ActivatedRoute){
    this._service.getPromotions().subscribe({
      next:(data)=>{this.promotions=data},
      error:(err)=>{this.errMessage=err}
      })


  }

postPromotion()  {
  let post=[]
  // this.fashion.Mota=this.fashion.Mota.replace(/<\/?p>/gi, '');
  this.promotion.cDate= new Date(Date.now())
  post.push(this.promotion)
  post.push(this.selectedProducts)
  console.log(post[0]);

  this._service.postPromotion(post).subscribe({
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




@ViewChild('selectedProductsDiv') selectedProductsDiv!: ElementRef;
selectedProducts: any[] = [];

onCheckboxChange(event: any, product: any) {
  if (event.target.checked) {
    this.selectedProducts.push(product._id);
  } else {
    const index = this.selectedProducts.indexOf(product);
    this.selectedProducts.splice(index, 1);
  }
  console.log( this.selectedProducts);

  // this.showSelectedProducts();
}
// showSelectedProducts() {
//   const selectedProductsHtml = this.selectedProducts.map(product => {
//     return `
//       <tr>
//         <td style="font-size:1rem; padding-right: 20px">${product.MaSP}</td>
//         <td style="width: 100px"><img style="max-height: 40%; max-width: 40%; text-align: center;" src="${product.Hinhanh[0]}" /></td>
//         <td style="margi"> ${product.TenSP} </td>
//       </tr>
//     `;
//   }).join('');

//   const html = `
//     <table class="product-table">
//       <thead>
//         <tr style="font-size:1rem">
//           <th>Mã </th>
//           <th>Hình ảnh</th>
//           <th>Tên sản phẩm</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${selectedProductsHtml}
//       </tbody>
//     </table>
//   `;

//   this.selectedProductsDiv.nativeElement.innerHTML = html;
// }



ngAfterViewInit() {
  // this.showSelectedProducts();
}
toMainPromotionPage(){
  this.router.navigate(['promotions'])
    }
  }




