import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminListService } from '../admin-list.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
//làm nút tìm kiếm research
range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});

admins:any;
errMessage:string=''
constructor(public _service: AdminListService){
this._service.getAdmins().subscribe({
next:(data)=>{this.admins=data},
error:(err)=>{this.errMessage=err}
})
}
}
