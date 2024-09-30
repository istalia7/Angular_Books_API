import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

// export const customInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('JWT_Token');
//   const clonedReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return next(clonedReq);
// };

export function customInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  const newReq = req.clone({
    headers,
  });

  return next(newReq);
}
