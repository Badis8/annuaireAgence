import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {BusinessHours} from "../utility/timeZone"
import {Agency} from "../agency"
@Component({
  selector: 'app-single-agency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-agency.component.html',
  styleUrls: ['./single-agency.component.css']
})
export class SingleAgencyComponent {
 
  @Input() agency!: Agency;
  isOpen!:boolean

  
  constructor(){
 
  } 

  ngOnInit(): void {
 
    this.isOpen = BusinessHours.isOpen(this.agency.workingHours);
  }
  
}