import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {BusinessHours} from "../utility/timeZone"
import {Agency} from "../agency"
import { RouterLink, RouterOutlet } from '@angular/router';
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
  
  constructor(){
 
  } 

  ngOnInit(): void {
 
    this.isOpen = BusinessHours.isOpen(this.agency.workingHours);
  }
  onCardClick(): void {
    this.overridenClickHandlerService.emitClickEvent(this.agency.id);
  }
}