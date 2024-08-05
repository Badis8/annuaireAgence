import { Component, ElementRef, HostListener, Input, AfterViewInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Employe } from '../employe';
import {EmployeCardComponent} from "../employe-card/employe-card.component"
import { Swiper } from 'swiper/types';
import { CommonModule } from '@angular/common';
 
 
@Component({
  selector: 'app-employee-slider',
  templateUrl: './employee-slider.component.html',
  standalone:true,
  imports:[EmployeCardComponent,CommonModule],
  styleUrls: ['./employee-slider.component.css'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeSliderComponent{
  @Input() employees: Employe[] | undefined;

  showForm = false;

  trackByEmploye(index: number, employe: any): number {
    return employe.id;  
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
 
 
  
 