import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom
import { KeycloakService } from './keycloack.service';  

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const authenticated = await firstValueFrom(this.keycloakService.isAuthenticated());
      console.log(authenticated);
      if (authenticated) {

        return true;
      } else {
        console.log("here")
        return false;
      }
    } catch {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
