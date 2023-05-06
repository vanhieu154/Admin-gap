import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminListService } from '../admin-list.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  users:any;
  errMessage:string=''
  constructor(public _service: AdminListService){
  this._service.getUsers().subscribe({
  next:(data)=>{this.users=data},
  error:(err)=>{this.errMessage=err}
  })

}
}
