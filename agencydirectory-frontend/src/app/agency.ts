import { WorkingHours } from "./working-hours";

export interface Agency {
    id:string;
    zone: string;
    address: string;
    workingHours:WorkingHours
  }