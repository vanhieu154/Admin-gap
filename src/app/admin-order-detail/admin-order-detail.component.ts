import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminOrderService } from '../admin-order.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  //
  selectedProduct:any;
  errMessage: any;
  constructor(private activateRoute:ActivatedRoute,private _fs:AdminOrderService, private router:Router)
  {
    activateRoute.paramMap.subscribe((param) => {
      let _id = param.get("_id");
      console.log(_id);
      if (_id != null) {
        this._fs.getAdminOrder(_id).subscribe({
          next: (data) => {
            this.selectedProduct = data;

          },
          error: (err) => {
            this.errMessage = err;
            console.log(this.errMessage);
          }
        })
      }
    })
  }
    goBack(){
    this.router.navigate(['admin-order'])
    }


}
