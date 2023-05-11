import { Component } from '@angular/core';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  orderInDay:any[]=[]
  totalInDay:number=0
  orderInWeek:any[]=[]
  totalInWeek:number=0
  orderInMonth:any[]=[]
  totalInMonth:number=0
  constructor(private orderService:AdminOrderService){
    this.orderService.getAdminOrders().subscribe({
      next:(data)=>{
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.orderInDay = data.filter((order: { cDate: string | number | Date; }) => {
          const orderDate = new Date(order.cDate);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate.getTime() === today.getTime();
        });
        this.totalInDay = this.orderInDay.reduce((total: any, order: { total: any; }) => total + order.total, 0);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Đặt ngày bắt đầu của tuần là ngày đầu tiên trong tuần

        this.orderInWeek = data.filter((order: { cDate: string | number | Date; }) => {
          const orderDate = new Date(order.cDate);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate >= startOfWeek && orderDate <= today;
        });
        this.totalInWeek = this.orderInWeek.reduce((total: any, order: { total: any; }) => total + order.total, 0);



        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Đặt ngày bắt đầu của tháng là ngày đầu tiên trong tháng

        this.orderInMonth = data.filter((order: { cDate: string | number | Date; }) => {
          const orderDate = new Date(order.cDate);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate >= startOfMonth && orderDate <= today;
        });
        this.totalInMonth = this.orderInMonth.reduce((total: any, order: { total: any; }) => total + order.total, 0);

      }
    })
  }
}
