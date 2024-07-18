import { EventEmitter, Injectable, inject } from '@angular/core';
import { AgencyLocation } from './agency-location';
import { Agency } from './agency';
import { MapPresenter } from './cartographie/services/MapService';
import { MapServiceLeafletImplementation } from './cartographie/services/MapServiceLeafletImplementation';
@Injectable({
  providedIn: 'root'
})
export class AgencyLocationManagementService {
  private _agencyFiltered = new EventEmitter<AgencyLocation[]>();
 
  
  mapPresenter: MapPresenter = inject(MapServiceLeafletImplementation);
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
  filterAgencyList(agencies: Agency[]): void {
    const agencyIds = agencies.map(agency => agency.id);
    console.log(this.agencies)
    this.filteredAgencies = this.agencies.filter(agencyLocation => 
      agencyIds.includes(agencyLocation.agencyID)
    );
 
    this._agencyFiltered.emit(this.filteredAgencies);
     
  }
 

}


 