import {Routes} from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {AddProductFormComponent} from "./add-product-form/add-product-form.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent,
    title: 'Product List',
  },
  // {
  //   path: '', redirectTo: 'products',
  //   pathMatch: 'full'
  // },
  {
    path: 'edit/:id', component: DetailProductComponent,
    title: 'User Detail',
  },
  {
    path: 'add', component: AddProductFormComponent,
    title: 'Add User',
  },
];

