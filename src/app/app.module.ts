import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { FormsModule } from '@angular/forms';
import { AdminPromotionComponent } from './admin-promotion/admin-promotion.component';
import { AdminCouponComponent } from './admin-coupon/admin-coupon.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MatInputModule } from '@angular/material/input';
import { BlogListComponent } from './blog-list/blog-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { SideNavComponent } from './side-nav/side-nav.component';

import { PUpdateComponent } from './p-update/p-update.component';
import { PNewComponent } from './p-new/p-new.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CNewComponent } from './c-new/c-new.component';
import { CUpdateComponent } from './c-update/c-update.component';
import { ProUpdateComponent } from './pro-update/pro-update.component';
import { ProNewComponent } from './pro-new/pro-new.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailComponent,
    AdminDetailComponent,
    AddAdminComponent,
    AdminOrderComponent,
    AdminOrderDetailComponent,
    AdminListComponent,
    CustomerListComponent,
    AdminProductComponent,
    AdminPromotionComponent,
    AdminCouponComponent,
    AdminLoginComponent,
    BlogListComponent,
    AddBlogComponent,
    BlogEditComponent,
    SideNavComponent,
    PUpdateComponent,
    PNewComponent,
    DeleteConfirmationDialogComponent,
    SuccessDialogComponent,
    CNewComponent,
    CUpdateComponent,
    ProUpdateComponent,
    ProNewComponent


  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    CKEditorModule
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
