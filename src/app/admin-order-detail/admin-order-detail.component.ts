import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminOrderService } from '../admin-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order';
import { User } from '../user';
import { Address } from '../address';


@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminOrderDetailComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  statusOptions = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'Preparing' },
    { value: 2, label: 'In Transit' },
    { value: 3, label: 'Delivered' },
    { value: 4, label: 'Cancelled' }
  ];
  selectedProduct=new Order()
  errMessage: any;
  selectedOrderDetail:any[]=[]
  selectedOrderUser=new User()
  selectedOrderAddress=new Address()
  constructor(private activateRoute:ActivatedRoute,private _fs:AdminOrderService, private router:Router)
  {
    activateRoute.paramMap.subscribe((param) => {
      let _id = param.get("_id");
      // console.log(_id);
      if (_id != null) {
        this._fs.getAdminOrder(_id).subscribe({
          next: (data) => {
            this.selectedProduct = data;
            // console.log(data);

          },
          error: (err) => {
            this.errMessage = err;
            // console.log(this.errMessage);
          }
        })
        this._fs.getAdminOrderDetail(_id).subscribe({
          next:(data)=>{this.selectedOrderDetail=data},
          error:(err)=>{this.errMessage=err}
        })
        this._fs.getAdminOrderUser(_id).subscribe({
          next:(data)=>{this.selectedOrderUser=data[0]
          // console.log(data[0]);
          },
          error:(err)=>{this.errMessage=err}
        })
        this._fs.getAdminOrderAddress(_id).subscribe({
          next:(data)=>{this.selectedOrderAddress=data[0]
          // console.log(data[0]);
          },
          error:(err)=>{this.errMessage=err}
        })
      }
    })

  }
  goBack(){
    this.router.navigate(['admin-order'])
  }
  getStatusLabel(status: number) {
    const statusOption = this.statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.label : '';
  }
  toMainCouponPage(){
    this.router.navigate(['admin-order'])
      }
}
