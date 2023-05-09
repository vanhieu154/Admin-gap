import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LogService } from './log.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin-gap';
  isLoggedIn: boolean = false;
  panelOpenState = false;
  showFiller = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  isDrawerOpen = false;
  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

constructor(private breakpointObserver: BreakpointObserver, private logService:LogService) {
  // this.isLoggedIn = this.logService.isLoggedIn;

  // Đăng ký để nhận thông báo từ service khi giá trị của biến isLoggedIn thay đổi
  this.logService.isLoggedIn.subscribe((isLoggedIn) => {
    this.isLoggedIn = isLoggedIn;

  });

  if (sessionStorage.getItem('checkLogin') === '1') {
    this.isLoggedIn=true
  }
 }
}
