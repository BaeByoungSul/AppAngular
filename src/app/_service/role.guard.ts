import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  console.log(route.data['role']);
  const routeGuard = route.data['role'] ;
  // access Token의 role

  const router = inject(Router);
  const loginService = inject(AuthService);
  const userRoles = loginService.getRoles();
  console.log(userRoles);
  // 사용자가 route의 role을 가지고 있어면 true else login 화면  
  if(userRoles.includes(routeGuard)){
    return true;
  } else {
    //router.navigate(['auth/login'])
    router.navigate(["/forbidden","403"] )
    
    return false;
  }
  
};
