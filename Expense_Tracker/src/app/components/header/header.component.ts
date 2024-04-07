import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  fullname: string = '';
  email: string = '';
 
  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
      this.userData();
    })
  }

  userData() {
    this.fullname = localStorage.getItem('fullname') || 'Guest';
    this.email = localStorage.getItem('email') || '';
  }

  logout(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('fullname');
    localStorage.removeItem('email');
    localStorage.removeItem('isAuthenticated');
    this.authService.isLoggedIn$.next(false);
    this.router.navigate(['/login']);

  }
}
