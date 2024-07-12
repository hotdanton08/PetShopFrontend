// src/app/services/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isAuthenticated();
  const userRole = authService.getRole();

  if (!isLoggedIn) {
    router.navigate(['/home']);
    return false;
  }

  if (!userRole) {
    router.navigate(['/home']);
    return false;
  }

  const roles = route.data['roles'] as Array<string>;
  if (roles && !roles.includes(userRole)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
