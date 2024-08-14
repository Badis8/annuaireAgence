import { Component } from '@angular/core';
import { KeycloakService } from "../keycloack.service";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  constructor(private keycloakService: KeycloakService) {

  }
  login(): void {
    this.keycloakService.login();
  }
}
