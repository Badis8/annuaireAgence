import { TimeInterval, WorkingHours } from "../working-hours";

export class BusinessHours {
    static isOpen(workingHours: WorkingHours, currentTime: Date = new Date()): boolean {
      const morningOpen = this.isOpenSession(workingHours.morningSession, currentTime);
      const eveningOpen = this.isOpenSession(workingHours.eveningSession, currentTime);
  
      return morningOpen || eveningOpen;
    }
  
    private static isOpenSession(session: TimeInterval, currentTime: Date): boolean {
      const { from, to } = session;
      const fromTime = this.parseTime(from);
      const toTime = this.parseTime(to);
  
      if (fromTime.getDate() !== toTime.getDate()) {
        throw new Error('Working hours cannot span across different days.');
      }
  
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentSecond = currentTime.getSeconds();
      const currentMillis = currentTime.getMilliseconds();
  
      const adjustedFromTime = new Date(fromTime.getTime() - currentMillis);
      const adjustedToTime = new Date(toTime.getTime() + (currentMillis >= 999 ? 1000 : 0));
  
      return (
        (currentHour > adjustedFromTime.getHours() ||
          (currentHour === adjustedFromTime.getHours() &&
            currentMinute > adjustedFromTime.getMinutes() ||
            (currentMinute === adjustedFromTime.getMinutes() &&
              currentSecond >= adjustedFromTime.getSeconds()))) &&
        (currentHour < adjustedToTime.getHours() ||
          (currentHour === adjustedToTime.getHours() &&
            currentMinute < adjustedToTime.getMinutes() ||
            (currentMinute === adjustedToTime.getMinutes() &&
              currentSecond <= adjustedToTime.getSeconds())))
      );
    }
  
    private static parseTime(timeString: string): Date {
      const [hour, minute, second] = timeString.split(':').map(Number);
      const date = new Date();
      date.setHours(hour);
      date.setMinutes(minute);
      date.setSeconds(second);
      return date;
    }
  }