import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { ShitesService } from "../shites.service"; // Assuming you have a CustomerService to handle HTTP requests

@Component({
  selector: 'app-add-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, NgIf, RouterLink],
  templateUrl: './add-shites.component.html',
  styleUrls: ['./add-shites.component.css']
})
export class AddShitesComponent {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: ShitesService,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company_name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.customerService.createCustomer(this.customerForm.value).subscribe(
        response => {
          console.log('Customer added successfully', response);
          this.router.navigate(['/shites']); // Redirect to customer list
        },
        error => {
          console.error('Error adding customer', error);
        }
      );
    }
  }

}
