import { Component, Input } from '@angular/core';
import { Employe } from '../employe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-grid.component.html',
  styleUrl: './employee-grid.component.css'
})
export class EmployeeGridComponent {
  @Input() employees: Employe[] | undefined;
}
