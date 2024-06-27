import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        localStorage.setItem('username', response.username);
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
