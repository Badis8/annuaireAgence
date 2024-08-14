import { Component, inject } from '@angular/core';
import { AgencyManagementService } from '../agency-management.service';
import { CommonModule } from '@angular/common';
import {KeycloackService} from "../keycloack.service";
import { FormControl, FormGroup, FormsModule } from '@angular/forms';  
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agency-management',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './agency-management.component.html',
  styleUrl: './agency-management.component.css'
})
export class AgencyManagementComponent {
  agencyService: AgencyManagementService = inject(AgencyManagementService); 
  tokenManger:KeycloackService=inject(KeycloackService);
  agencyFilter = new FormGroup({
    manager: new FormControl(''),
    commune: new FormControl(''),
    employee: new FormControl(''),
    zone: new FormControl('')
  });
  constructor(private router: Router) { }
  onSubmit() {
    this.agencyService.filterAgencyList(this.agencyFilter.value.zone,this.agencyFilter.value.commune,this.agencyFilter.value.manager,this.agencyFilter.value.employee)
  } 

  goToCreateAgency() {
    this.router.navigate(['/create-agency']); 
  }
  onDeleteAgency(id: string): void {
    this.agencyService.deleteRemoteAgencyById(id,this.tokenManger.Token).then(() => {
     
    
    }).catch((error) => {
      console.error('Error deleting agency:', error);
    });
  }
}
