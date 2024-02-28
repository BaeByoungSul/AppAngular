import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const ensureChangeSkippedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
  const extras = router.getCurrentNavigation()?.extras;
  if (extras?.skipLocationChange) {
    return true;
  }
  console.log('ensureChangeSkippedGuard');
  
  const url = router.parseUrl(state.url);
  router.navigateByUrl(url, { ...extras, skipLocationChange: true, });
  return false;

  
};
