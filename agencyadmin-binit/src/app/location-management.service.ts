import { EventEmitter, Injectable, inject } from '@angular/core';
import { AgencyLocation } from './agency-location';
import { AgencyDetails } from './agency-details';
 
@Injectable({
  providedIn: 'root'
})
export class AgencyLocationManagementService {
  private _agencyFiltered = new EventEmitter<AgencyLocation[]>();
  url = 'http://localhost:8082/agency/listAgencys';
  agencies: AgencyLocation[] = []
  filteredAgencies: AgencyLocation[] = []
  get agencyFiltered() {
    return this._agencyFiltered.asObservable();
  }
 
  constructor() {
      this.getRemoteAgencysLocations().then((agencies: AgencyLocation[]) => {
      this.agencies = agencies;
      this.filteredAgencies=agencies;
  });
   }
  getAllAgencys(): AgencyLocation[] {
    return this.agencies;
  }
  async getRemoteAgencysLocations(): Promise<AgencyLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  filterAgencyList(agencies: AgencyDetails[]): void {
    const agencyIds = agencies.map(agency => agency.id);
 
    this.filteredAgencies = this.agencies.filter(agencyLocation => 
      agencyIds.includes(agencyLocation.agencyID)
    );
 
    this._agencyFiltered.emit(this.filteredAgencies);
     
  }
 

}


 