import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order-service.service';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import {CurrencyPipe, NgForOf} from "@angular/common";
import { ProductService } from "../../product/product.service";
import { AgentService } from "../../agent/agent.service";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgForOf,
    CurrencyPipe
  ],
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  orderForm: FormGroup;
  creators: any[] = [];
  products: any[] = [];
  totalAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private sellerService: AgentService,
    private productService: ProductService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      customer: ['', Validators.required],
      creator: ['', Validators.required],
      order_units: this.fb.array([this.createOrderUnit()])
    });

    this.orderForm.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });
  }

  ngOnInit(): void {
    this.fetchCreators();
    this.fetchProducts();
  }

  fetchCreators(): void {
    this.sellerService.getAllUsers().subscribe((data: any[]) => {
      this.creators = data;
    });
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  createOrderUnit(): FormGroup {
    return this.fb.group({
      amount: ['', Validators.required],
      price: ['', Validators.required],
      product: ['', Validators.required]
    });
  }

  get orderUnits(): FormArray {
    return this.orderForm.get('order_units') as FormArray;
  }

  addOrderUnit(): void {
    this.orderUnits.push(this.createOrderUnit());
    this.calculateTotalAmount();
  }

  removeOrderUnit(index: number): void {
    this.orderUnits.removeAt(index);
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.orderUnits.controls.reduce((total, control) => {
      const amount = control.get('amount')?.value || 0;
      const price = control.get('price')?.value || 0;
      return total + (amount * price);
    }, 0);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.orderService.saveOrder(this.orderForm.value).subscribe(
        response => {
          this.router.navigate(['/orders']);
        },
        error => {
          console.error('Error saving order', error);
        }
      );
    }
  }
}
