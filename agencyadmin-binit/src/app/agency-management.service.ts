import { EventEmitter, Injectable, inject } from '@angular/core';
import { AgencyDetails } from './agency-details';
import { AgencyLocationManagementService } from './location-management.service'
import { AgencyLocation } from './agency-location';
@Injectable({
  providedIn: 'root'  
})
export class AgencyManagementService { 
 
  url = 'http://localhost:8083/agency';
  agencies: AgencyDetails[] = []
  filteredAgencies: AgencyDetails[] = []
  agencyService: AgencyLocationManagementService = inject(AgencyLocationManagementService);
  constructor() {
      this.getRemoteAgencys().then((agencies: AgencyDetails[]) => {
      this.agencies = agencies;
      this.filteredAgencies=agencies;
   
  });
 
   }
  getAllAgencys(): AgencyDetails[] {
    return this.agencies;
  }
  async getRemoteAgencys(): Promise<AgencyDetails[]> {
 
    const data = await fetch(this.url+"/listAgencys");
 
    return (await data.json()) ?? [];
 
  }

 
  async deleteRemoteAgencyById(id: string,token:String | undefined) {
    try {
      const response = await fetch(`${this.url}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,  
         
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      this.agencies = this.agencies.filter(agency => agency.id !== id);
      this.filteredAgencies = this.agencies
    } catch (error:any) {
      console.error(`Failed to delete agency with ID ${id}:`, error.message);
    }
  }
  

  filterAgencyList(
    zone: string | undefined | null,
    commune: string | undefined | null,
    manager: string | undefined | null,
    employeeName: string | undefined | null
  ): void {
    this.filteredAgencies = this.agencies.filter(agency => {
      
      const matchesZone = !zone || agency.zone.includes(zone);
      const matchesCommune = !commune || agency.commune.includes(commune);
      const matchesManager = !manager || agency.manager.fullName.includes(manager);
      const matchesEmployee = !employeeName || agency.employees.some(emp => emp.fullName.includes(employeeName));
  
    
      return matchesZone && matchesCommune && matchesManager && matchesEmployee;
    });
  
    
    this.agencyService.filterAgencyList(this.filteredAgencies);
  }
 
}
