
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyManagementComponent } from './agency-management/agency-management.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from "./authentication-guard.guard";
import {AgencyCreationComponent} from "./agency-creation/agency-creation.component";
import { ModofyAgencyComponent } from './modofy-agency/modofy-agency.component';
export const routes: Routes = [
  { path: 'agencyManagement', component: AgencyManagementComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent }, 
  { path: 'create-agency', component: AgencyCreationComponent },
  { path: 'edit-agency/:id', component: ModofyAgencyComponent },
  { path: '**', redirectTo: 'agencyManagement' }  ,
 
];  