import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminListService } from '../admin-list.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {
  user:any;
  errMessage:string=''
  constructor(private _service: AdminListService){
  }
  searchUser(userId:string)
  {
  this._service.getUser(userId).subscribe({
  next:(data)=>{this.user=data},
  error:(err)=>{this.errMessage=err}
  })
  }
}
