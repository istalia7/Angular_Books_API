import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IAuth } from '../../interfaces/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  errorMessage: string = '';
  authService = inject(AuthService);
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onRegister() {
    this.authService.register(this.registerForm.value as IAuth).subscribe({
      next: (response) => {
        alert('Votre compte a été créé !');
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      },
    });
    this.registerForm.reset();
  }
}
