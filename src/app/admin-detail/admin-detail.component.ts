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

    admin = new Admin()
    selectedRole: any

    constructor(private service: AdminDetailService, private route: ActivatedRoute, private router: Router) {
      this.getDetail()
    }

    getDetail() {
      this.service.getAAdmin(this.route.snapshot.paramMap.get('id')).subscribe({
        next: (data) => {
          this.admin = data
        }
      })
    }

    update() {

      this.service.putAAdmin(this.admin).subscribe({
        next: (data) => {
          this.router.navigate(['admin-list'])
        },
        error: (err) => alert(err)
      })
    }

    changeRole() {
      this.admin.Permission = this.selectedRole
    }

    onFileSelected(event: any,admin:Admin) {
      let files = event.target.files;
      for(let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function () {
          admin.Image.push(reader.result!.toString());
        };


        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
    }
     onDeleteImage(index: number) {
      this.admin.Image.splice(index, 1);
    }
  }

