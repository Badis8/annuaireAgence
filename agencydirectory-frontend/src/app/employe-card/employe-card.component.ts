import {Component, Input} from '@angular/core';
import { Employe } from '../employe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employe-card.component.html',
  styleUrl: './employe-card.component.css'
})
export class EmployeCardComponent {
  isPopupVisible = false;
  popupPosition = { top: 0, left: 0 };
 @Input() employee:Employe | undefined;

 showPopup(event: MouseEvent) {
  this.isPopupVisible = !this.isPopupVisible;
  this.popupPosition.top = event.clientY - 30;  
  this.popupPosition.left = event.clientX - 30;  
}
}
 
