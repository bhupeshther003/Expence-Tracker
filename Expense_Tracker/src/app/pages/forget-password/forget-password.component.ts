import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterModule } from 'express';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export default class ForgetPasswordComponent implements OnInit {
  
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  forgetForm !: FormGroup;

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  submit(){
    // console.log(this.forgetForm.value);
    this.authService.sendEmailService(this.forgetForm.value.email)
    .subscribe({
      next: (res)=>{
        alert(res.message);
        this.forgetForm.reset();
      },
      error: (err)=>{
        alert(err.error.message);
      }
    });
  }


}
