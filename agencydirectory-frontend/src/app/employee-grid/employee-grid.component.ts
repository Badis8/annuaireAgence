import { Component, Input } from '@angular/core';
import { Employe } from '../employe';
import { CommonModule } from '@angular/common';
import {EmployeCardComponent} from "../employe-card/employe-card.component";
@Component({
  selector: 'app-employee-grid',
  standalone: true,
  imports: [CommonModule,EmployeCardComponent],
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.css'
})
export class EmployeeGridComponent {
  @Input() employees: Employe[] | undefined;
}
