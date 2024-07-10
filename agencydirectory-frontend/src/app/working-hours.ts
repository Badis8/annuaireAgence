export interface TimeInterval {
    from: string;
    to: string;
  }
  
 export interface WorkingHours {
    morningSession: TimeInterval;
    eveningSession: TimeInterval;
  }