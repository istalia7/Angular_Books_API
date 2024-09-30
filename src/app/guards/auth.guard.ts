import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const IsLoggedIn = inject(AuthService).IsLoggedIn();
  const getRoles = inject(AuthService).getRoles('ROLE_ADMIN');
  const router = inject(Router);

  if (IsLoggedIn && getRoles) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
