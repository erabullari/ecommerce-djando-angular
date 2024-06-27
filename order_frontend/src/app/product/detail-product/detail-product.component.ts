import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ProductService, Category } from '../product.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, ReactiveFormsModule, RouterLink, MatSelectModule],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  productId!: number | null;
  editForm: FormGroup;
  productData: any = {};
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router // Inject the Router service
  ) {
    this.editForm = this.fb.group({
      name: [''],
      default_price: [''],
      description: [''],
      categories: [[]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productId = id !== null ? +id : null;
      if (this.productId !== null) {
        this.getProductDetails(this.productId);
      } else {
        console.error('No productId found');
      }
    });
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log('Loaded categories:', this.categories); // Debug log for categories
    });
  }

  getProductDetails(id: number): void {
    this.productService.getProductDetails(id).subscribe((data: any) => {
      this.productData = data;
      console.log('Loaded product details:', this.productData); // Debug log for product data
      this.editForm.patchValue({
        name: data.name,
        default_price: data.default_price,
        description: data.description,
        categories: data.categories.map((category: any) => category.id)
      });
      console.log('Form patched with:', this.editForm.value); // Debug log for form patch
    });
  }

  onSubmit(): void {
    if (this.productId !== null) {
      const updatedProduct = {
        ...this.editForm.value,
        categories: this.editForm.value.categories // Send only the array of category IDs
      };
      console.log('Submitting updated product:', updatedProduct); // Debug log for submission data

      this.productService.updateProductDetails(this.productId, updatedProduct).subscribe(
        response => {
          console.log('Product details updated successfully', response);
          this.router.navigate(['/products']); // Redirect to the list of products
        },
        error => {
          console.error('Error updating product details', error);
        }
      );
    } else {
      console.error('productId is null'); // Handle missing productId
    }
  }
}
