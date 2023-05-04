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
statusOptions = [
  { value: 0, label: 'Pending' },
  { value: 1, label: 'Preparing' },
  { value: 2, label: 'In Transit' },
  { value: 3, label: 'Delivered' },
  { value: 4, label: 'Cancelled' }
];
admin_order=new Order();
status:string='All'
admin_orders:any;
errMessage:string='';
selectedProduct:any;
displayedColumns: string[] = ['_id', 'username','Total', 'Status', 'Order_Date','Image'];
admin_closed_order:any;
admin_open_order:any;
show_orders:any;
constructor(public _service:AdminOrderService,private router:Router,private http: HttpClient,private activateRoute:ActivatedRoute,private _fs:AdminOrderService){
this._service.getAdminOrders().subscribe({
next:(data)=>{
  this.show_orders=data
  this.admin_orders=data
  this.admin_closed_order = data.filter((order: { status: number; }) => order.status === 4 || order.status === 3);
  this.admin_open_order = data.filter((order: { status: number; }) => order.status === 0 || order.status === 1|| order.status === 2);
},
error:(err)=>{this.errMessage=err}
})
// this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
//   const _id = paramMap.get('_id');
//   if (_id) {
//     this._fs.getAdminOrder(_id).subscribe({
//       next: (data) => {
//         this.selectedProduct = data;
//         this.admin_order = this.selectedProduct;
//       },
//       error: (err) => {
//         this.errMessage = err;
//       }
//     });
//   }
// });
}
  viewDetail(f:any)
    {
      this.router.navigate(['admin-order-detail',f._id])
    }


    onStatusChange(element: any) {
      if(element.status==3){
        element.DueDate=new Date()
      }
      else{
        if(element.status==4){
          element.ShipByDate=new Date()
        }
      }
      this._service.updateOrder(element).subscribe({
        next:(data)=>{
          this.admin_orders=data
        },
        error:(err)=>{this.errMessage=err}
        })
      // Thực hiện các tác động cần thiết khi giá trị thay đổi
    }
  showAllOrder(){
    this.show_orders=this.admin_orders
  }
  showClosedOrder(){
    this.show_orders=this.admin_closed_order
    // console.log(this.show_orders);

  }
  showopenOrder(){
    this.show_orders=this.admin_open_order
    // console.log(this.show_orders);

  }
}


