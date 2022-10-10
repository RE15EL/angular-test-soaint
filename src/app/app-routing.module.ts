import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesGuardGuard } from './shared/guards/roles-guard.guard';

const routes: Routes = [
  { path: 'products', loadChildren: ()=> import('./pages/products/products.module').then( m=>m.ProductsModule)},
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'orders', loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule) ,
    data:{
      role:'write'
    },
    canActivate:[RolesGuardGuard]  
  },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { 
    path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    data:{
      role:'write'
    },
    canActivate:[RolesGuardGuard]  
  },
  { 
    path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    data:{
      role:'read'
    },
    canActivate:[RolesGuardGuard]
  },
  { path:'', redirectTo:'products', pathMatch:'full'},
  { path:'**', redirectTo:'products', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
