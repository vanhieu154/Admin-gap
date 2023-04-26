import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
<<<<<<< Updated upstream
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
=======
import { AdminListComponent } from './admin-list/admin-list.component';
>>>>>>> Stashed changes
const routes: Routes = [
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
<<<<<<< Updated upstream
    path:"admin-order-detail",component:AdminOrderDetailComponent
  },
=======
    path:"admin-list",component:AdminListComponent
  },

>>>>>>> Stashed changes
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

