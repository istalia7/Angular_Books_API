import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { IAuth } from '../interfaces/auth';
import { IToken } from '../interfaces/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private loginUrl = 'https://127.0.0.1:8000/api/login_check';
  private registerUrl = 'https://127.0.0.1:8000/users';

  tokenService = inject(TokenService);
  decodedToken = inject(TokenService).decodeToken();

  login(auth: IAuth): Observable<IToken> {
    return this.http.post<IToken>(`${this.loginUrl}`, auth);
  }

  IsLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  getRoles(value: string): boolean {
    if (this.decodedToken) {
      return this.decodedToken.roles.some((role: string) => role === value);
    }
    return false;
  }

  register(auth: IAuth): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.registerUrl}`, auth);
  }
}
