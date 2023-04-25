import { Component } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  qh: string[] = [
    'Nhân viên trực chat',
    'Nhân viên',
    'Cửa hàng trưởng',]
}
