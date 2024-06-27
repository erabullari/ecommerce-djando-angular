import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order-service.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class AddOrderComponent {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      code: ['', Validators.required],
      code_year: ['', Validators.required],
      date_registered: ['', Validators.required],
      customer: ['', Validators.required],
      creator: ['', Validators.required],
      order_units: this.fb.array([this.createOrderUnit()])
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
  }

  removeOrderUnit(index: number): void {
    this.orderUnits.removeAt(index);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.orderService.saveOrder(this.orderForm.value).subscribe(
        response => {
          this.router.navigate(['/orderlist']);
        },
        error => {
          console.error('Error saving order', error);
        }
      );
    }
  }
}
