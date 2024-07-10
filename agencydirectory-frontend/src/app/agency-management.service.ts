import { Injectable } from '@angular/core';
import { Agency } from './agency';

@Injectable({
  providedIn: 'root'
})
export class AgencyManagementService { 
  url = 'http://localhost:8081/agency/listAgencys';
  agencies: Agency[] = []
  constructor() {
      this.getRemoteAgencys().then((agencies: Agency[]) => {
      this.agencies = agencies;
  });
   }
  getAllAgencys(): Agency[] {
    return this.agencies;
  }
  async getRemoteAgencys(): Promise<Agency[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
