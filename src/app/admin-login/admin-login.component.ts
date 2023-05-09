import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LogService } from '../log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  hide = true;
  name = new FormControl('', [Validators.required]);


  adminname:string = '';
  password:string = '';
  message = '';
  admin:any;
  errMessage:string='';
  constructor(private logService: LogService, private router:Router){

  }

  onLogin(): void {
    // console.log(this.adminname);
    console.log(this.adminname, this.password);

    this.logService.login(this.adminname, this.password).subscribe({
      next: (data) => {
        this.admin = data;
        if(this.admin.message==null){
          sessionStorage.setItem("Account", JSON.stringify(this.admin));

        }else{
          alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
      },

    });
  }


  getErrorNameMessage() {
    if (this.name.hasError('required')) {
      return '*Vui lòng nhập tên đăng nhập';
    }

    return this.name.hasError('name') ? 'Tên đăng nhập không hợp lệ' : '';
  }
  pass = new FormControl('', [Validators.required]);
  getErrorPWMessage() {
    if (this.pass.hasError('required')) {
      return '*Vui lòng nhập mật khẩu';
    }

    return this.pass.hasError('password') ? 'Mật khẩu không hợp lệ' : '';
  }
}
