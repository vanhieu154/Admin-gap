import { Component } from '@angular/core';

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
}
