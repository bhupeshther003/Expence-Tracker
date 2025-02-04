import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit  {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm !: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Login is Success!");
        localStorage.setItem("user_id", res.data._id);
        localStorage.setItem("fullname", `${res.data.firstname} ${res.data.lastname}`);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem('isAuthenticated', 'true');
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['']);
        this.loginForm.reset();
      },
      error:(err)=>{
        console.log(err);
        alert(err.error);
      }
    })
  }

}
