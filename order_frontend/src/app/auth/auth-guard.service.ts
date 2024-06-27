import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the import path based on your project structure

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user && user.is_superuser) {
      return true;
    } else if (user && user.groups.includes('Shites')) {
      this.router.navigate(['/']); // Redirect to the home page or any other appropriate route
      return false;
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false;
    }
  }
}
