import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminListService } from '../admin-list.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {
  // user=new User();
  // errMessage:string=''
  // id:any
  // admins:any
  // constructor(private activateRoute:ActivatedRoute,private _service: AdminListService){

  //   activateRoute.paramMap.subscribe(
  //     (param)=>{
  //       this.id=param.get('id')
  //       if(this.id!=null)
  //       {
  //         this._service.getUser(this.id).subscribe({
  //           next:(data)=>{this.user=data},
  //           error:(err)=>{this.errMessage=err}

  //       } ) })}

        user=new User();
        errMessage:string=''
        id:any
        users:any
        constructor(private activateRoute:ActivatedRoute,private _service: AdminListService)
        {
          activateRoute.paramMap.subscribe(
            (param)=>{
              this.id=param.get('id')
              if(this.id!=null)
              {
                this._service.getUser(this.id).subscribe({
                  next:(data)=>{this.user=data},
                  error:(err)=>{this.errMessage=err}
                })
              }
            }
          )
        }

      }
  // searchUser(userId:string)
  // {
  // this._service.getUser(userId).subscribe({
  // next:(data)=>{this.user=data},
  // error:(err)=>{this.errMessage=err}
  // })
  // };



