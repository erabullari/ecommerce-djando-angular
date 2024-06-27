import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShitesService } from "../shites.service";
import { NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './shites-detail.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    MatButton
  ],
  styleUrls: ['./shites-detail.component.css']
})
export class ShitesDetailComponent implements OnInit {
  customerId!: number | null;
  editForm: FormGroup;
  customerData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private customerService: ShitesService
  ) {
    this.editForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company_name: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.customerId = id !== null ? +id : null;
      if (this.customerId !== null) {
        this.getCustomerDetails(this.customerId);
      }
    });
  }

  getCustomerDetails(id: number): void {
    this.customerService.getCustomerDetails(id).subscribe(data => {
      this.customerData = data;
      this.editForm.patchValue({
        first_name: data.first_name,
        last_name: data.last_name,
        company_name: data.company_name,

      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.customerId !== null) {
      this.customerService.updateCustomerDetails(this.customerId, this.editForm.value).subscribe(
        response => {
          console.log('Customer details updated successfully', response);
          this.router.navigate(['/shites']); // Redirect to customer list
        },
        error => {
          console.error('Error updating customer details', error);
        }
      );
    } else {
      console.error('Form is invalid or customerId is null');
    }
  }

}
