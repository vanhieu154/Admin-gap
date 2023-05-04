import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminPromotionComponent } from './admin-promotion/admin-promotion.component';
import { AdminCouponComponent } from './admin-coupon/admin-coupon.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BlogListComponent } from './blog-list/blog-list.component';
<<<<<<< Updated upstream
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
=======
import { PNewComponent } from './p-new/p-new.component';
import { PUpdateComponent } from './p-update/p-update.component';
import { CNewComponent } from './c-new/c-new.component';
import { CUpdateComponent } from './c-update/c-update.component';
import { ProUpdateComponent } from './pro-update/pro-update.component';
import { ProNewComponent } from './pro-new/pro-new.component';

>>>>>>> Stashed changes

const routes: Routes = [
  {
    path:"",component:AdminLoginComponent
  },
  {
    path:"customer-detail",component:CustomerDetailComponent
  },
  {
    path:"admin-detail",component:AdminDetailComponent
  },
  {
    path:"add-admin",component:AddAdminComponent
  },
  {
    path:"admin-order",component:AdminOrderComponent
  },
  {
    path:"admin-order/:_id",component:AdminOrderDetailComponent
  },
  {
    path:"admin-list",component:AdminListComponent
  },
  {
    path:"customer-list",component:CustomerListComponent
  },
  {
    path:"products",component:AdminProductComponent
  },
  {
    path:"promotions",component:AdminPromotionComponent
  },
  {
    path:"coupons",component:AdminCouponComponent
  },
  {
    path:"blog-list",component:BlogListComponent
  },
  {
<<<<<<< Updated upstream
    path:"add-blog",component:AddBlogComponent
  },
  {
    path:"blog-edit/:id",component:BlogEditComponent
  },
=======
    path:"newproduct",component:PNewComponent
  },
  {
    path:"updateproduct/:id",component:PUpdateComponent
  },
  {
    path:"newcoupon",component:CNewComponent
  },
  {
    path:"updatecoupon/:id",component:CUpdateComponent
  },
  {
    path:"updatepromotion/:id",component:ProUpdateComponent
  },
  {
    path:"newpromotion",component:ProNewComponent
  },

>>>>>>> Stashed changes
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

