import { WorkingHours } from "./working-hours";

export interface Employe {
    employeID: string;
    fullName: string;
    availability: WorkingHours;
    email: string;
    phoneNumber: string;
    job:string;
}