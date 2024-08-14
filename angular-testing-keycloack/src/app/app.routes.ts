import { Routes } from '@angular/router';
import { AgencyManagementComponent } from "./agency-management/agency-management.component"
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
    { path: 'protected', component: AgencyManagementComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' }
  ];
