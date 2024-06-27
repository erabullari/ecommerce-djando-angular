import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AgentService} from "../agent.service";

@Component({
  selector: 'app-seller-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './seller-detail.component.html',
  styleUrl: './seller-detail.component.css'
})
export class SellerDetailComponent implements OnInit {
  userId!: number | null;
  editForm: FormGroup;
  userData: any = {};


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private yourService: AgentService,  private router: Router) {
    this.editForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id !== null ? +id : null;
      if (this.userId !== null) {
        this.getUserDetails(this.userId);
      } else {

      }
    });

  }


  getUserDetails(id: number): void {
    this.yourService.getUserDetails(id).subscribe((data: any) => {
      this.userData = data; // Assign the retrieved user data
      this.editForm.patchValue({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.username,

      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.userId !== null) {
      this.yourService.updateUserDetails(this.userId, this.editForm.value).subscribe(
        response => {
          console.log('User details updated successfully', response);
          // Optionally, refresh the list or navigate away
          this.router.navigate(['/agents']);
        },
        error => {
          console.error('Error updating user details', error);
        }
      );
    }
    else {
      console.error('Form is invalid or userId is null'); // Handle invalid form or missing userId
    }
  }
}

