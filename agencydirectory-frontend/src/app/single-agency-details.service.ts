import { Injectable } from '@angular/core';
import { AgencyDetails } from './agency-details';

@Injectable({
  providedIn: 'root'
})
export class SingleAgencyDetailsService {
    
 
  url = 'http://localhost:8083/agency/parapID/';
  agencies: AgencyDetails | undefined  
 
 

  async getRemoteAgencysDetails(agencyID: string): Promise<AgencyDetails> {

    const data = await fetch(`${this.url}${agencyID}`);
    console.log(data)
    return (await data.json()) ?? {};
  }
}
  
 
 
