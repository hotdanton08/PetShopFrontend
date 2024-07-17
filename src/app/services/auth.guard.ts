// src/app/services/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(
    take(1), // 確保只取一次值
    map((user) => {
      if (!user) {
        router.navigate(['/home']);
        return false;
      }

      const roles = route.data['roles'] as Array<string>;
      if (roles && !roles.includes(user.role)) {
        router.navigate(['/']);
        return false;
      }

      return true;
    })
  );
};
