import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {AgentService} from "../agent.service"; // Assume you have a UserService to handle HTTP requests

@Component({
  selector: 'app-add-seller-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, NgIf, RouterLink],
  templateUrl: './add-seller-form.component.html',
  styleUrls: ['./add-seller-form.component.css']
})
export class AddSellerFormComponent {
  sellerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: AgentService,
    private router: Router
  ) {
    this.sellerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.sellerForm.valid) {
      this.userService.createUser(this.sellerForm.value).subscribe(
        response => {
          console.log('User added successfully', response);
          this.router.navigate(['/agents']);
        },
        error => {
          console.error('Error adding user', error);
        }
      );
    }
  }

}
