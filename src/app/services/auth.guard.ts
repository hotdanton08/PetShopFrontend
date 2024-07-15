// src/app/services/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store
    .select((state) => state.auth.user)
    .pipe(
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
