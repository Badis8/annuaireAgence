import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloackService {
  private _keycloak: Keycloak | undefined;
  private _token:String | undefined;
  constructor() { }

   get Keycloak(): Keycloak {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8081',
        realm: 'binit',
        clientId: 'binit',
          
      });
    }
    return this._keycloak;
  }

  get Token(): String|undefined {
    
    return this._token;
  }


  async initialize(): Promise<void> {
    console.log("Initializing Keycloak...");
    const keycloak = this.Keycloak;
    const authenticated = await keycloak?.init({
      onLoad: 'login-required'

    });
    console.log(keycloak);
    if (authenticated) {
      this._token=this.Keycloak.token;
    } else {
      console.log("Failed to authenticate");
    }
  }
}
