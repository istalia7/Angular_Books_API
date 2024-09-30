import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { IAuth } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // loginObj: any = {
  //   username: '',
  //   password: '',
  // };

  // router = inject(Router);

  // onLogin() {
  //   this.authService.login(this.loginObj).subscribe((res: any) => {
  //     localStorage.setItem('JWT_Token', res.token);
  //     this.router.navigateByUrl('books');
  //   });
  // }
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onLogin() {
    this.loginUser();
    alert('Vous êtes connectés !');
    this.router.navigate(['books']);
  }

  private loginUser() {
    this.authService
      .login(this.loginForm.value as IAuth)
      .subscribe((response) => {
        this.tokenService.saveToken(response.token);
      });
  }
}
