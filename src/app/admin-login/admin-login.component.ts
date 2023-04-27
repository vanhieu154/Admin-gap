import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  hide = true;
  name = new FormControl('', [Validators.required]);
  getErrorNameMessage() {
    if (this.name.hasError('required')) {
      return '*Vui lòng nhập tên đăng nhập';
    }

    return this.name.hasError('name') ? 'Tên đăng nhập không hợp lệ' : '';
  }
  password = new FormControl('', [Validators.required]);
  getErrorPWMessage() {
    if (this.password.hasError('required')) {
      return '*Vui lòng nhập mật khẩu';
    }

    return this.password.hasError('password') ? 'Mật khẩu không hợp lệ' : '';
  }
}
