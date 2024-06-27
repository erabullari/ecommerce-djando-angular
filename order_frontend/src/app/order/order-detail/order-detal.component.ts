import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { OrderService } from '../order-service.service';
import { ProductService } from '../../product/product.service';
import { OrderUnit, Product, User } from '../order.interface';
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {AddOrderUnitDialogComponent} from "../add-order-unit-dialog/add-order-unit-dialog.component";
import {AgentService} from "../../agent/agent.service";

@Component({
  selector: 'app-order-detal',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule
  ],
  templateUrl: './order-detal.component.html',
  styleUrls: ['./order-detal.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId!: number | null;
  editForm: FormGroup;
  orderData: any = {};
  products: Product[] = [];
  users: User[] = [];
  orderUnitColumns: string[] = ['amount', 'price', 'product', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router,
    private creatorService: AgentService,
    private dialog: MatDialog
  ) {
    this.editForm = this.fb.group({
      code: [{ value: '', disabled: true }, Validators.required],
      code_year: [{ value: '', disabled: true }, Validators.required],
      date_registered: [{ value: '', disabled: true }, Validators.required],
      customer: ['', Validators.required],
      creator: ['', Validators.required],
      order_units: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.orderId = id !== null ? +id : null;
      if (this.orderId !== null) {
        this.getOrderDetails(this.orderId);
      } else {
        // Handle the error, e.g., navigate to an error page or show a message
      }
    });

    this.loadProducts();
    this.loadCreators();
  }

  get orderUnits(): FormArray {
    return this.editForm.get('order_units') as FormArray;
  }

  getOrderDetails(id: number): void {
    this.orderService.getSingleOrderById(id.toString()).subscribe((data: any) => {
      this.orderData = data;
      this.editForm.patchValue({
        code: data.code,
        code_year: data.code_year,
        date_registered: data.date_registered,
        customer: data.customer,
        creator: data.creator
      });
      this.setOrderUnits(data.order_units);
    });
  }

  setOrderUnits(orderUnits: OrderUnit[]): void {
    const orderUnitsFormArray = this.fb.array(
      orderUnits.map(orderUnit => this.fb.group({
        amount: [orderUnit.amount, Validators.required],
        price: [orderUnit.price, Validators.required],
        product: [orderUnit.product, Validators.required]
      }))
    );

    this.editForm.setControl('order_units', orderUnitsFormArray);
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  loadCreators(): void {
    this.creatorService.getAllUsers().subscribe((creators: User[]) => {
      this.users = creators;
    });
  }

  openAddOrderUnitDialog(): void {
    const dialogRef = this.dialog.open(AddOrderUnitDialogComponent, {
      width: '250px',
      data: { products: this.products }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderUnits.push(this.fb.group(result));

      }
    });
  }

  removeOrderUnit(index: number): void {
    const orderUnitId = this.orderUnits.at(index).get('id')?.value;
    if (orderUnitId) {
      this.orderService.deleteOrderUnit(orderUnitId).subscribe(
        () => {
          this.orderUnits.removeAt(index);
        },

      );
    } else {
      this.orderUnits.removeAt(index); // For new units that are not saved in the backend yet
    }
  }
  onSubmit(): void {
    if (this.editForm.valid && this.orderId !== null) {
      this.orderService.updateOrderDetails(this.orderId, this.editForm.getRawValue()).subscribe(
        response => {
          this.router.navigate([this.router.url]);
        },

      );
    }
  }


}
