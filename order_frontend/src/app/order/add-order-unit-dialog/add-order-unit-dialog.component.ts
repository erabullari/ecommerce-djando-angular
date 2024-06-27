import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions, MatDialogClose
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderUnit, Product} from '../order.interface';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {OrderService} from "../order-service.service";

@Component({
  selector: 'app-add-order-unit-dialog',
  templateUrl: './add-order-unit-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgForOf
  ],
  standalone: true
})

export class AddOrderUnitDialogComponent {
  addOrderUnitForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddOrderUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { products: Product[] },
    private fb: FormBuilder,
    private orderService: OrderService

  ) {
    this.addOrderUnitForm = this.fb.group({
      amount: ['', Validators.required],
      price: ['', Validators.required],
      product: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addOrderUnitForm.valid) {
      const orderUnit: OrderUnit = this.addOrderUnitForm.value;
      this.orderService.saveOrderUnit(orderUnit).subscribe(
        (response: OrderUnit) => {
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error saving order unit', error);
        }
      );
    }
  }

}
