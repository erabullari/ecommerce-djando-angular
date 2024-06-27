import { Component, OnInit } from "@angular/core";
import { first } from "rxjs";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import {DeleteConfirmationDialogComponent} from "../../product/product-list/delete-confirmation-dialog.componet";
import {ShitesService} from "../shites.service";

export interface Customer {
  isDeleting: boolean;
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './shites-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    MatTableModule,
    MatButton,
    RouterOutlet
  ],
  styleUrls: ['./shites-list.component.css']
})
export class ShitesListComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'company_name', 'actions'];
  dataSource = new MatTableDataSource<Customer>();

  constructor(private customerService: ShitesService, public dialog: MatDialog) {}

  ngOnInit() {
    this.customerService.getAllCustomers()
      .pipe(first())
      .subscribe(customers => {
        this.customers = customers;
        this.dataSource.data = this.customers; // Update the dataSource with the fetched customers
      });
    this.loadCustomers();
  }


  loadCustomers(): void {
    this.customerService.getAllCustomers()
      .pipe(first())
      .subscribe(customers => {
        this.customers = customers;
        this.dataSource.data = this.customers; // Update the dataSource with the fetched customers
      });
  }

  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCustomer(id);
      }
    });
  }

  deleteCustomer(id: number) {
    const customer = this.customers.find(x => x.id === id);
    if (!customer) return;
    customer.isDeleting = true;
    this.customerService.deleteCustomer(id)
      .pipe(first())
      .subscribe(() => {
        this.customers = this.customers.filter(x => x.id !== id);
        this.dataSource.data = this.customers; // Update the dataSource after deletion
      });
  }


}
