import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { PromotionService } from './promotion.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Promotion } from './Promotion';
@Component({
  selector: '[app-admin-promotion]',
  templateUrl: './admin-promotion.component.html',
  styleUrls: ['./admin-promotion.component.css']
})
export class AdminPromotionComponent {

  selectPromotionId: string='';
  promotion=new Promotion();
  promotions:any;
  selectedFiles: File[] = [];
  errMessage:string=''
  public searchPromotion:string=''

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(public _service:PromotionService, private http: HttpClient,private router:Router, public dialog: MatDialog){
    this._service.getPromotions().subscribe({
      next:(data)=>{this.promotions=data},
      error:(err)=>{this.errMessage=err}
      })

  }
  getPromotion() {
    const url = `http://localhost:4000/promotions/${this.selectPromotionId}`;
    this.http.get<Promotion>(url).subscribe(data => {
      this.promotion = data;
    });
  }


  deletePromotion(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '417px',
      height: '220px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const url = `http://localhost:4000/promotions/${id}`;
  this.http.delete(url).subscribe({
    next: () => {
      this.promotions = this.promotions.filter((promotion: { _id: string; }) => promotion._id !== id);
    },
    error: (err) => {
    }
  });
      }
    });
  }

  ngOnInit() {
    // Khởi tạo FormGroup cho range date picker
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }
  filteredPromotions: any[] | undefined;
  filteredDate: any[] | undefined;

  filterPromotions() {
     this.filteredPromotions = this.promotions.filter((promotion:  { TenPromotion: string; LoaiPromotion: string; Gia: string;Mota :string; LoaiSP :string; }) =>
     promotion.TenPromotion.toString().toLowerCase().includes(this.searchPromotion.toLowerCase()) ||
     promotion.LoaiPromotion.toLowerCase().includes(this.searchPromotion.toLowerCase()) ||
     promotion.Mota.toString().toLowerCase().includes(this.searchPromotion.toLowerCase()) ||
     promotion.Gia.toString().toLowerCase().includes(this.searchPromotion.toLowerCase()) ||
     promotion.LoaiSP.toString().toLowerCase().includes(this.searchPromotion.toLowerCase()));
  }

  filterDate() {
    const start = this.range.value.start ?? new Date('2020-01-01');
    const end = this.range.value.end ?? new Date('2999-12-31');
    this.filteredDate = this.promotions.filter((promotion: { Ngaybatdau: string | number | Date; Ngayketthuc: string | number | Date; }) => {
      const Ngaybatdau = new Date(promotion.Ngaybatdau);
      const Ngayketthuc = new Date(promotion.Ngayketthuc);
      return Ngaybatdau >= start && Ngayketthuc <= end;
    });
  }




onClear(): void{
  this.searchPromotion = ''
  this.filterPromotions();
}
toUpdatePromotionPage(a:any){
  this.router.navigate(['updatepromotion',a._id])
    }

 toNewPromotionPage(){
  this.router.navigate(['newpromotion'])
    }


}
