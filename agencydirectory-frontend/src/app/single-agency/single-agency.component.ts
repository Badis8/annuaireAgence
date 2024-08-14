import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {BusinessHours} from "../utility/timeZone"
import {Agency} from "../agency"
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {OnClickHandlerService} from "../on-click-handler.service"
@Component({
  selector: 'app-single-agency',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './single-agency.component.html',
  styleUrls: ['./single-agency.component.css']
})
export class SingleAgencyComponent {
 
  overridenClickHandlerService: OnClickHandlerService = inject(OnClickHandlerService);
  @Input() agency!: Agency;
  isOpen!:boolean
  @Output() agencyClicked = new EventEmitter<string>();
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    this.isOpen = BusinessHours.isOpen(this.agency.workingHours[currentDay]);
  }
  onCardClick(): void {
    this.overridenClickHandlerService.emitClickEvent(this.agency.id);
  } 

  onButtonClick() {
    this.overridenClickHandlerService.emitClickEvent(this.agency.id);
    this.router.navigate(['/detail', this.agency.id]);
  }
}