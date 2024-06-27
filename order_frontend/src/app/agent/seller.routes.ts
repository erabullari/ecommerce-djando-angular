import { Routes } from '@angular/router';
import { SellerListComponent } from './seller/seller.component';
import { SellerDetailComponent } from "./seller-detail/seller-detail.component";
import { AddSellerFormComponent } from "./add-seller-form/add-seller-form.component";

export const SELLER_ROUTES: Routes = [
  {
    path: '', component: SellerListComponent,
    title: 'Seller List',
  },
  {
    path: 'details/:id', component: SellerDetailComponent,
    title: 'User Detail',
  },
  {
    path: 'add', component: AddSellerFormComponent,
    title: 'Add User',
  },

];
