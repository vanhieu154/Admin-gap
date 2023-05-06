import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminListService } from '../admin-list.service';
import { Router } from '@angular/router';

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
  inactiveUser:any
  activeUser:any
  constructor(public _service: AdminListService, private router:Router){
  this._service.getUsers().subscribe({
  next:(data)=>{
    this.users=data
    this.activeUser=data.filter((u: { UserStatus: boolean; })=>u.UserStatus==true)
    this.inactiveUser=data.filter((u: { UserStatus: boolean; })=>u.UserStatus==false)
  },
  error:(err)=>{this.errMessage=err}
  })

}
toUserDetail(user:any){
  this.router.navigate(['customer-detail/'+user._id])
    }


    updateUserStatus(element: any,a:boolean) {
      element.UserStatus = a
      console.log(element);

      this._service.updateUserStatus(element).subscribe({
        next:(data)=>{
          this.activeUser=data.filter((u: { UserStatus: boolean; })=>u.UserStatus==true)
          this.inactiveUser=data.filter((u: { UserStatus: boolean; })=>u.UserStatus==false)        },
        error:(err)=>{
          this.errMessage=err
        console.log(this.errMessage);
        }
        })
    }




}
