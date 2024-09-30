import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  router = inject(Router);
  saveToken(token: string): void {
    sessionStorage.setItem('JWT_Token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('JWT_Token');
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }

  clearToken(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
