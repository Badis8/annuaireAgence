import { Employe } from './employee';
import { WorkingHours } from './working-hours';

export interface AgencyRequest {
  zone: string;
  workingHours: { [key: string]: WorkingHours };
  address: string;
  manager: Employe;
  latitude: number;
  longitude: number;
  commune: string;
  phoneNumber: string;
  employees: Employe[];
}
