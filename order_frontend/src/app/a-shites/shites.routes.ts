import { Routes } from '@angular/router';
import {ShitesListComponent} from "./shites-list/shites-list.component";
import {ShitesDetailComponent} from "./shites-detail/shites-detail.component";
import {AddShitesComponent} from "./add-shites/add-shites.component";

export const SHITES_ROUTES: Routes = [
  {
    path: '', component: ShitesListComponent,
    title: 'Customer List',
  },
  {
    path: 'details/:id', component: ShitesDetailComponent,
    title: 'Customer Detail',
  },
  {
    path: 'add', component: AddShitesComponent,
    title: 'Add Customer',
  },
];
