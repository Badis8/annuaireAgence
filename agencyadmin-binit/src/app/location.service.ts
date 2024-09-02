import { Injectable } from '@angular/core';
import { AgencyLocation } from './agency-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:8082/agency';
  constructor() { }
  async getAgencyById(id: String): Promise<AgencyLocation | null> {
    try {
      const response = await fetch(`${this.apiUrl}/parapID/${id}`, {
        method: 'GET',
        headers: {
 
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const agency = await response.json();
      return agency as AgencyLocation;
    } catch (error: any) {
      console.error(`Failed to fetch agency with ID ${id}:`, error.message);
      return null;
    }
  } 



}
