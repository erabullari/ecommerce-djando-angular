import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./auth/login/login.component";
import {SellerListComponent} from "./agent/seller/seller.component";
import {RegisterComponent} from "./user-register/user-register.component";
import {Register_ROUTES} from "./user-register/user-register.routs";
import {AuthGuardService} from "./auth/auth-guard.service";


export const routes: Routes = [

  { path: 'login', component: LoginComponent , title:'Login'},

  {
    path: 'products',
    loadChildren: () => import('./product/product.routes').then((m) => m.PRODUCT_ROUTES)
  },

  {
    path: 'shites',
    loadChildren: () => import('./a-shites/shites.routes').then((m) => m.SHITES_ROUTES),
    canActivate: [AuthGuardService]
   },
  {
    path: 'register', component: RegisterComponent,
    loadChildren: () => import('./user-register/user-register.routs').then((m) => m.Register_ROUTES)

  },
  {
    path: 'agents',
    loadChildren: () => import('./agent/seller.routes').then((m) => m.SELLER_ROUTES,)
  },

  {
    path: 'orders',
    loadChildren: () => import('./order/order.routes').then((m) => m.ORDER_ROUTES)
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
