import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "./user-register.service";



@Component({
  selector: 'app-register',
  templateUrl: './user-register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./user-register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',

  };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  register(): void {
    this.userService.register(this.user).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
