import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak | undefined;
  private authenticated: boolean = false;

  constructor(private router: Router) {
    this.initKeycloak();
  }

  private initKeycloak(): void {
    const keycloakConfig: Keycloak.KeycloakConfig = {
      url: "http://localhost:8081",
      realm: 'binit',
      clientId: 'binit'
    };

    this.keycloak = new Keycloak(keycloakConfig);

    this.keycloak?.init({ onLoad: 'login-required' }).then(authenticated => {
      this.authenticated = authenticated;
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Keycloak initialization failed', error);
      this.router.navigate(['/login']);
    });
  }
  isAuthenticated(): Observable<boolean> {
    

    return of(this.authenticated);
  }

  getToken(): string |undefined {
    return this.keycloak?.token;
  }

  login(): void {
    this.keycloak?.login();
  }
}