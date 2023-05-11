import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LogService } from './log.service';
import {  Router } from '@angular/router';
import { Admin } from './admin';
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
  admin= new Admin()
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  isDrawerOpen = false;
  errMessage: any;
  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

  constructor(private router:Router, private breakpointObserver: BreakpointObserver, private logService:LogService) {
  this.logService.isLoggedIn.subscribe((isLoggedIn) => {
    this.isLoggedIn = isLoggedIn;
    this.admin=JSON.parse(sessionStorage.getItem('Account') || '{}')
  });
  const account = JSON.parse(sessionStorage.getItem('Account') || '{}');
  if (sessionStorage.getItem('checkLogin') === '1') {
    this.isLoggedIn=true
    this.admin=JSON.parse(sessionStorage.getItem('Account') || '{}')

  }
  console.log(account._id);


  if(account._id!=null){
    this.logService.getAdmin(account._id).subscribe({
      next:(data)=>{this.admin=data,
      console.log(this.admin);
      },
      error:(err)=>{this.errMessage=err}
    })
  }

 }
 toOverview(){
  if(this.admin.Permission==0){
    this.router.navigate(['/overview'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toAdminList(){
  console.log(this.admin.Permission=0);

  if(this.admin.Permission==0){
    this.router.navigate(['/admin-list'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toAddAdmin(){
  if(this.admin.Permission==0){
    this.router.navigate(['/add-admin'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toCustomerList(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['/customer-list'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toBlogList(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['/blog-list'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toAddBlog(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['/add-blog'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }

 toPromotion(){
  console.log(this.admin.Permission);

  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['promotions'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toNewPromotion(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['newpromotion'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toCoupons(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['coupons'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toNewCoupons(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['/newcoupon'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toAdminOrder(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['/admin-order'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toAddProduct(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['/adproducts'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
 toNewProduct(){
  if(this.admin.Permission==0 || this.admin.Permission==1){
    this.router.navigate(['/newproduct'])
  }
  else{
    console.log("Bạn không có thẩm quyền");
  }
 }
}
