import { Component, inject } from '@angular/core';
import { AgencyManagementService } from '../agency-management.service';
import { CommonModule } from '@angular/common';
import {KeycloackService} from "../keycloack.service";
import { FormControl, FormGroup, FormsModule } from '@angular/forms';  
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { GeoLocation } from '../geo-location';
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
  handleMapClick(data: GeoLocation): void {
      console.log(data);
  }
  goToCreateAgency() {
    this.router.navigate(['/create-agency']); 
  } 
  editAgency(agencyId: string) {
    console.log("Navigating to edit agency");
    this.router.navigate(['/edit-agency', agencyId])
      .then(() => console.log('Navigation successful'))
      .catch(err => console.error('Navigation error:', err));
  }
  onDeleteAgency(id: string): void {
    this.agencyService.deleteRemoteAgencyById(id,this.tokenManger.Token).then(() => {
     
    
    }).catch((error) => {
      console.error('Error deleting agency:', error);
    });
  } 
 
}
