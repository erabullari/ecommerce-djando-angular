import {Routes} from '@angular/router';
import {OrderListComponent} from "./order-list/order-list.component";
import {SellerDetailComponent} from "../agent/seller-detail/seller-detail.component";
import {OrderDetailComponent} from "./order-detail/order-detal.component";
import {AddOrderComponent} from "./add-order/add-order.component";

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    component: OrderListComponent,
    title: 'Order List',
  },

  {
    path: 'detail/:id', component: OrderDetailComponent,
    title: 'Order Detail',
  },
  {
    path: 'new', component: AddOrderComponent,
    title: 'Order',
  },
];
