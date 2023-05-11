import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminListService } from '../admin-list.service';
import { Router } from '@angular/router';

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
})
  inactiveAdmin:any
  activeAdmin:any
  admins:any
  errMessage:string=''
    constructor(public _service: AdminListService, private router:Router){
    this._service.getAdmins().subscribe({
        next:(data)=>{
          this.admins=data
          this.activeAdmin=data.filter((a: { AdminStatus: boolean; })=>a.AdminStatus==true)
          this.inactiveAdmin=data.filter((a: { AdminStatus: boolean; })=>a.AdminStatus==false)
        },
        error:(err)=>{this.errMessage=err}
        })

}
updateAdminStatus(element: any,b:boolean) {
  element.AdminStatus = b
  console.log(element);

  this._service.updateAdminStatus(element).subscribe({
    next:(data)=>{
      this.activeAdmin=data.filter((a: {AdminStatus: boolean; })=>a.AdminStatus==true)
      this.inactiveAdmin=data.filter((a: {AdminStatus: boolean; })=>a.AdminStatus==false)        },
    error:(err)=>{
      this.errMessage=err
    console.log(this.errMessage);
    }
    })
  }
  goTo(id:any) {
    this.router.navigate([`admin-detail/${id}`])
  }

  filteredAdmins: any[] | undefined;


  filterAdmins() {
     this.filteredAdmins = this.admins.filter((admin:  { adminname: string; _id: string; name :string;Permission:string }) =>
     admin.adminname.toString().includes(this.searchAdmin.toLowerCase()) ||
     admin._id.toLowerCase().includes(this.searchAdmin.toLowerCase()) ||
     admin.Permission.toLowerCase().includes(this.searchAdmin.toLowerCase()) ||
     admin.name.toLowerCase().includes(this.searchAdmin.toLowerCase()) );
  }
  public searchAdmin:string=''

}
