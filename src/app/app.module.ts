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


@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailComponent,
    AdminDetailComponent,
    AddAdminComponent

  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    BrowserAnimationsModule
  ],
  exports:[
    // MatButtonModule,
    MatFormFieldModule,
    // MatInputModule,
    // MatRippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
