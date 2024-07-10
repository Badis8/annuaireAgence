import { Component ,inject} from '@angular/core';
import { Agency } from '../agency';
import {SingleAgencyComponent} from '../single-agency/single-agency.component'; 
import { CommonModule } from '@angular/common';
import { AgencyManagementService} from '../agency-management.service';
@Component({
  selector: 'app-agency-list',
  standalone: true,
  imports: [SingleAgencyComponent,CommonModule],
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.css'
})
export class AgencyListComponent {
  agencies: Agency[] = [];
  agencyService: AgencyManagementService = inject(AgencyManagementService);
  constructor() {
    this.agencyService.getRemoteAgencys().then((agencies: Agency[]) => {
      this.agencies = agencies;

    });
   
  }
}