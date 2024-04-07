import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Example: Check if user is authenticated (replace this with your actual authentication logic)
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
