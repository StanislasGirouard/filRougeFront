import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)

  if (auth.role == "ROLE_ADMIN") {
    return true
  }

  const router: Router = inject(Router);
  return router.parseUrl("/login")
};
