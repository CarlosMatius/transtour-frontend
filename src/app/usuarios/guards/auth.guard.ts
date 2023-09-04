import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.isAuthenticated()) {
    if(authService.isTokenExpirado()) {
      authService.logout();
      router.navigate(['/index']);
      return false;
    }
    return true;
  }
  router.navigate(['/index']);
  return false;
};