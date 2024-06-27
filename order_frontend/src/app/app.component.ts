import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {SellerListComponent} from "./agent/seller/seller.component";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  imports: [CommonModule, RouterOutlet, SellerListComponent, RouterModule, NavbarComponent],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'untitled';

}
