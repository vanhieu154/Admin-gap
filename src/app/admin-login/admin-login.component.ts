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


  adminname = '';
  password = '';
  message = '';
  admin:any;
  errMessage:string='';
  constructor(private logService: LogService, private router:Router){

  }

  onLogin(): void {
    this.logService.login(this.adminname, this.password).subscribe({
      next: (data) => {
        this.admin = data;
        sessionStorage.setItem("Account", JSON.stringify(this.admin));
        if(this.admin.adminname!=null && this.admin.password!=null){
          alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }else{
          this.router.navigate(['']);  // dẫn điến trang chủ admin
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
