import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Product } from './product';
import { ProductApiService } from './product-api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
@Component({
  selector: '[app-admin-product]',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {


  public Editor = ClassicEditor;
  selectProductId: string='';
  product=new Product();
  products:any;
  selectedFiles: File[] = [];
  errMessage:string=''
  constructor(public _service: ProductApiService, private http: HttpClient,private router:Router, public dialog: MatDialog){
  this._service.getProducts().subscribe({
  next:(data)=>{this.products=data},
  error:(err)=>{this.errMessage=err}
  })


  }
getProduct() {
    const url = `http://localhost:4000/products/${this.selectProductId}`;
    this.http.get<Product>(url).subscribe(data => {
      this.product = data;
    });
  }
  onDeleteImage(index: number) {
    this.product.Hinhanh.splice(index, 1);
  }

  deleteProduct(id: string): void {

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '417px',
      height: '220px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const url = `http://localhost:4000/products/${id}`;
  this.http.delete(url).subscribe({
    next: () => {
      // console.log(`Đã xóa sản phẩm với id=${id}`);
      this.products = this.products.filter((product: { _id: string; }) => product._id !== id);
    },
    error: (err) => {
      // console.log(`Lỗi xóa sản phẩm với id=${id}: `, err);
    }
  });
  const index = this.products.findIndex((product: { _id: string; }) => product._id === id);

    // Xử lý khi xóa sản phẩm đầu tiên
    if (index === 0) {
      this.firstCellValue = 1;
      this.products.splice(index, 1);
      for (let i = 1; i < this.products.length; i++) {
        this.products[i].MaSP = this.products[i - 1].MaSP + 1;
      }
      return;
    }

    // Xử lý khi xóa sản phẩm không phải đầu tiên
    if (index > 0) {
      const deletedProduct = this.products.splice(index, 1)[0];
      for (let i = index; i < this.products.length; i++) {
        this.products[i].MaSP = deletedProduct.MaSP + i;
      }
    }
      }
    });
  }


  filteredProducts: any[] | undefined;


  filterProducts() {
     this.filteredProducts = this.products.filter((product:  { MaSP: string; TenSP: string; Price: number;LoaiSP :string; }) =>
     product.MaSP.toString().includes(this.searchProduct.toLowerCase()) ||
     product.TenSP.toLowerCase().includes(this.searchProduct.toLowerCase()) ||
     product.LoaiSP.toLowerCase().includes(this.searchProduct.toLowerCase()) ||
     product.Price.toString().toLowerCase().includes(this.searchProduct.toLowerCase()));
  }


  public searchProduct:string=''
    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });






  onClear() {
    this.searchProduct = '';
    this.filterProducts();
 }



 toUpdateProductPage(a:any){
  this.router.navigate(['updateproduct',a._id])
    }

 toNewProductPage(){
  this.router.navigate(['newproduct'])
    }


  showProductDetail(product: Product) {
    this.activeContent = 'detailproduct';
    this.product = product;
  }
  activeContent = 'content1';
  showContent(content: string): void {
          this.activeContent = content;
  }

  ngOnInit(): void {
    // Thực hiện khởi tạo giá trị cho các ô còn lại
    for (let i = 1; i < this.products.length; i++) {
      this.products[i].MaSP = this.products[i - 1].MaSP + 1;
    }
  }
  getCellValue(i: number): number {
    // Trả về giá trị của ô đầu tiên hoặc giá trị của ô tiếp theo nếu ô đầu tiên được xóa
    return i === 0 ? this.firstCellValue : this.products[i - 1].MaSP;
  }
  firstCellValue = 1;


}


