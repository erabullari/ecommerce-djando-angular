import { Component, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { OrderService } from '../order-service.service';
import { DatePipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import { first } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Order } from "../order.interface";
import {DeleteConfirmationDialogComponent} from "../../product/product-list/delete-confirmation-dialog.componet";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    MatButton,
    RouterLink
  ],
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  dataSource = new MatTableDataSource<Order>();
  displayedColumns: string[] = [
    'code', 'code_year', 'date_registered',
    'user', 'creator_username', 'actions'
  ];


  constructor(private orderService: OrderService, public dialog: MatDialog, private  authService : AuthService,private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  openDeleteConfirmationDialog(productId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { id: productId, type: 'product' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOrder(productId);
      }
    });
  }
  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.orders = data.results;
        this.dataSource.data = this.orders; // Set the dataSource's data
      },
      (error) => console.error('Error fetching orders', error)
    );
  }

  deleteOrder(id: number): void {
    const order = this.orders.find(x => x.id === id);
    if (!order) return;

    this.orderService.deleteOrder(id)
      .pipe(first())
      .subscribe(() => {// kjo nk te funks
          this.orders = this.orders.filter(x => x.id !== id);
          this.dataSource.data = this.orders;
        },
        (error) => console.error('Error deleting order', error));
  }



  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

