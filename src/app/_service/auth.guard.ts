import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthService);
  const router = inject(Router);
  if(loginService.isLoggedIn()){
    return true;
  }else {
    router.navigate(['auth/login'])
    return false;
  }
  //return true;
};
