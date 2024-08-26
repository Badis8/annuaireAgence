import { Component, Input, OnInit } from '@angular/core';
import { AgencyDetails } from '../agency-details';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agency-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agency-card.component.html',
  styleUrl: './agency-card.component.css'
})
export class AgencyCardComponent implements OnInit {
  @Input() agencyDetails: AgencyDetails | undefined;
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.agencyDetails);
  }
  getOpeningHours(day: string, session: string): string {
 
 
  
 
    const sessionTimes = this.agencyDetails?.workingHours[day]?.[session];
  
    if (sessionTimes) {
      return `${this.formatTime(sessionTimes.from)} - ${this.formatTime(sessionTimes.to)}`;
    } else {
      return 'Closed';
    }
  }
  
  private formatTime(timeString: string): string {
    const time = new Date(`1970-01-01T${timeString}`);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  goBack() {
    this.router.navigate(['/']);  
  }
}