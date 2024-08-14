import { WorkingHours } from "./working-hours";

export interface Emploie {
    [key: string]: {
        workingHours:WorkingHours;
    }
}
