import { Injectable, inject } from '@angular/core';
import { Agency } from './agency';
import  { BusinessHours}    from "./utility/timeZone"
import { AgencyLocationManagementService } from './agency-location-management.service'
@Injectable({
  providedIn: 'root' // why, my theopry is it makes it a singleton
})
export class AgencyManagementService { 
  url = 'http://localhost:8081/agency/listAgencys';
  agencies: Agency[] = []
  filteredAgencies: Agency[] = []
  agencyService: AgencyLocationManagementService = inject(AgencyLocationManagementService);
  constructor() {
      this.getRemoteAgencys().then((agencies: Agency[]) => {
      this.agencies = agencies;
      this.filteredAgencies=agencies;
   
  });
 
   }
  getAllAgencys(): Agency[] {
    return this.agencies;
  }
  async getRemoteAgencys(): Promise<Agency[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  filterAgencyList(zone: string|undefined|null, isOpen: boolean|undefined|null) {
    this.filteredAgencies= this.agencies.filter(agency => {
      return (!zone || agency.zone.includes(zone)) && (isOpen === undefined || isOpen === BusinessHours.isOpen(agency.workingHours));
    });
    this.agencyService.filterAgencyList(this.filteredAgencies)
    
  }

}
