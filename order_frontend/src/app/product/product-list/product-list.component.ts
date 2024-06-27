import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderRowDef,
  MatRowDef,
  MatTableModule,
  MatTableDataSource
} from "@angular/material/table";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ProductService } from "../product.service";
import { first } from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationDialogComponent} from "./delete-confirmation-dialog.componet";

interface Product {
  id: number;
  name: string;
  description: string;
  default_price: number;
  categories: string[];
  isDeleting: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCellDef,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatTableModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'default_price', 'description', 'categories', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private productService: ProductService,
  public dialog: MatDialog) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts()
      .pipe(first())
      .subscribe((products: Product[]) => {
        this.products = products;
        this.dataSource.data = this.products; // Update the dataSource with the fetched products
      }, error => {
        console.error('Error loading products', error);
      });
  }

  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {

      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: number) {
    const product = this.products.find(x => x.id === id);
    if (!product) return;
    product.isDeleting = true;
    this.productService.deleteProduct(id)
      .pipe(first())
      .subscribe(() => {
        this.products = this.products.filter(x => x.id !== id);
        this.dataSource.data = this.products; // Update the dataSource after deletion
      });
  }

  getCategories(categories: string[]): string {
    return categories.join(', ');
  }
}
