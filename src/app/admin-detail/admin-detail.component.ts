import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Admin, AdminFix } from '../admin';
import { AdminListService } from '../admin-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDetailService } from '../admin-detail.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent {
  qh: string[] = [
    'Nhân viên trực chat',
    'Nhân viên',
    'Cửa hàng trưởng',]

    user = new AdminFix()
    selectedRole: any

    constructor(private service: AdminDetailService, private route: ActivatedRoute, private router: Router) {
      this.getDetail()
    }

    getDetail() {
      this.service.getAAdmin(this.route.snapshot.paramMap.get('id')).subscribe({
        next: (data) => {
          this.user = data
        }
      })
    }

    update() {

      this.service.putAAdmin(this.user).subscribe({
        next: (data) => {
          this.router.navigate(['admin-list'])
        },
        error: (err) => alert(err)
      })
    }

    changeRole() {
      this.user.Permission = this.selectedRole
    }
  }

