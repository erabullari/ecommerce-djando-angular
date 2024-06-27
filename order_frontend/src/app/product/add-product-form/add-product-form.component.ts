import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ProductService } from "../product.service"; // Ensure this import path is correct
import { CommonModule } from '@angular/common';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      default_price: ['', Validators.required],
      description: ['', Validators.required],
      categories: [[], Validators.required]  // Allow multiple categories
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      error => {
        console.error('Error loading categories', error);
      }
    );
  }

  onSubmit(): void {   //method for saving
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const categoryIds = formValue.categories.map((categoryId: number) => categoryId);
      const payload = { ...formValue, categories: categoryIds };

      this.productService.createProduct(payload).subscribe(
        response => {
          console.log('Product added successfully', response);
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Error adding product', error);
        }
      );
    }
  }
}
