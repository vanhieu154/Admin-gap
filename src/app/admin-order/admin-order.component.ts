import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminOrderService } from '../admin-order.service';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Order } from '../order';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminOrderComponent {
//làm nút tìm kiếm research
range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});
//get dữ liệu vào
admin_order=new Order();
status:string='All'
admin_orders:any;
errMessage:string='';
selectedProduct:any;
displayedColumns: string[] = ['_id', 'username','Total', 'Status', 'Order_Date','Image'];

constructor(public _service:AdminOrderService,private router:Router,private http: HttpClient,private activateRoute:ActivatedRoute,private _fs:AdminOrderService){
this._service.getAdminOrders().subscribe({
next:(data)=>{this.admin_orders=data},
error:(err)=>{this.errMessage=err}
})
this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
  const _id = paramMap.get('_id');
  if (_id) {
    this._fs.getAdminOrder(_id).subscribe({
      next: (data) => {
        this.selectedProduct = data;
        this.admin_order = this.selectedProduct;
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
});
}
viewDetail(f:any)
  {
    this.router.navigate(['admin-order',f._id])
  }

markAsDelivered(_id: string) {

  this._service.getAdminOrders().subscribe({
    next:(data)=>{this.admin_orders=data},
    error:(err)=>{this.errMessage=err}
    })
    }
    markDelivered(_id:string)
    {
    this._service.markOrderAsDelivered(this.admin_orders).subscribe({
    next:(data)=>{this.admin_orders=data},
    error:(err)=>{this.errMessage=err}
    })
    }
}


