import { Injectable } from '@angular/core';
import { AgencyLocation } from './agency-location';
@Injectable({
  providedIn: 'root'
})
export class AgencyLocationManagementService {
  url = 'http://localhost:8082/agency/listAgencys';
  agencies: AgencyLocation[] = []
  constructor() {
      this.getRemoteAgencysLocations().then((agencies: AgencyLocation[]) => {
      this.agencies = agencies;
  });
   }
  getAllAgencys(): AgencyLocation[] {
    return this.agencies;
  }
  async getRemoteAgencysLocations(): Promise<AgencyLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}


 