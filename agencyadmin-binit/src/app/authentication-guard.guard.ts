import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {KeycloackService} from './keycloack.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(KeycloackService);
  const router = inject(Router);
  console.log(tokenService.Token);
  if (tokenService.Keycloak.isTokenExpired()) {
 
    router.navigate(['login']);
    return false;
  }
  return true;
};