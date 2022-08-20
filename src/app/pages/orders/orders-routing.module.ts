import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  { path: 'orderList', component: OrderListComponent },
  { path: '', component: OrdersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
