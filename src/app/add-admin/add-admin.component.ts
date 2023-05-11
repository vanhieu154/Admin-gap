import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, map, retry } from 'rxjs';
import { Admin } from '../admin';
import { AdminListService } from '../admin-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
    qh = [
      { value: 0, label: 'Quản trị viên' },
      { value: 1, label: 'Cửa hàng trưởng' },
      { value: 2, label: 'Nhân viên cửa hàng' },
      // { value: 3, label: 'Nhân viên trực chat' },

    ];
    admin=new Admin();
    errMessage:string=''
    selectedFiles: File[] = [];
    Image:any[]=[];
    router: any;
    constructor(private _service: AdminListService){
    }
    public setAdmin(a:Admin)
    {
    this.admin=a
    }
    onFileSelected(event:any,admin:Admin) {
      let files = event.target.files;
      for(let i = 0; i < files.length; i++) {
        // let file = files[i];
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = function () {
      //   me.selectedFiles.push(file);
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
    postAdmin()
    {

        // this.admin.Is_Active=true,
        this.admin.cDate=new Date()
        this._service.postAdmin(this.admin).subscribe({
        next:(data)=>{this.admin=data},
        error:(err)=>{this.errMessage=err}
      })
      this.router.navigate(['admin-list'])

    }

    registerForm!: any;
    Account_Name: any;
    name:any;
    Email: any;
    Date_of_Birth: any;
    Phone_Number: any;
    Gender: any;

    getErrorNameMessage() {
      if (this.name.hasError('required')) {
        return '*Vui lòng nhập họ và tên';
      }

      return this.name.hasError('name') ? 'Họ và tên không hợp lệ' : '';
    }

    getErrorAccMessage() {
      if (this.Account_Name.hasError('required')) {
        return '*Vui lòng nhập tên đăng nhập';
      }

      return this.Account_Name.hasError('Account_Name') ? 'Tên đăng nhập không hợp lệ' : '';
    }

    getErrorDOBMessage() {
      if (this.Date_of_Birth.hasError('required')) {
        return '*Vui lòng nhập ngày sinh';
      }

      return this.Date_of_Birth.hasError('Date_of_Birth') ? 'Ngày sinh không hợp lệ' : '';
    }

    getErrorPhoneMessage() {
      if (this.Phone_Number.hasError('required')) {
        return '*Vui lòng nhập số điện thoại';
      }

      return this.Phone_Number.hasError('pattern') ? '*Số điện thoại không hợp lệ' : '';
    }

    getErrorEmailMessage() {
      if (this.Email.hasError('required')) {
        return 'Bạn phải nhập email';
      }
      return this.Email.hasError('Email') ? 'Email không hợp lệ' : '';
    }


}

