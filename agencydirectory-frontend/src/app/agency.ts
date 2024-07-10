import { WorkingHours } from "./working-hours";

export interface Agency {
    zone: string;
    address: string;
    workingHours:WorkingHours
  }