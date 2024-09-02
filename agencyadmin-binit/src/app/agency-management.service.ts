import { EventEmitter, Injectable, inject } from '@angular/core';
import { AgencyDetails } from './agency-details';
import { AgencyLocationManagementService } from './location-management.service'
import { AgencyLocation } from './agency-location';
import { AgencyRequest } from './agency-request';
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
  async createAgency(formData: FormData, token: String|undefined): Promise<any> {
    try {
      const response = await fetch(`${this.url}/addAgency`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Failed to create agency:', error.message);
      throw error;
    }
  }
  async getAgencyById(id: String, token: String | undefined): Promise<AgencyDetails | null> {
    try {
      const response = await fetch(`${this.url}/parapID/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const agency = await response.json();
      return agency as AgencyDetails;
    } catch (error: any) {
      console.error(`Failed to fetch agency with ID ${id}:`, error.message);
      return null;
    }
  } 


  async updateAgency(id: string|undefined, formData: FormData, token: String | undefined): Promise<any> {
    try {
      const response = await fetch(`${this.url}/updateAgency/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error: any) {
      console.error('Failed to update agency:', error.message);
      throw error;
    }
  }
}

  
 
