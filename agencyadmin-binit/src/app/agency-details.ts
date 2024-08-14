import { Employe } from "./employee";
import { WorkingHours } from "./working-hours";
export interface AgencyDetails {
    workingHours: { [key: string]: WorkingHours };   
    zone: string;
    id: string;
    manager: Employe;
    address: string;
    employees: Employe[];
    commune: string;
    phoneNumber:string;

}
  
 
