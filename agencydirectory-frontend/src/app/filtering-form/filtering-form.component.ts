import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgencyManagementService } from '../agency-management.service';
import {BusinessHours} from "../utility/timeZone"
@Component({
  selector: 'app-filtering-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filtering-form.component.html',
  styleUrls: ['./filtering-form.component.css']
})
export class FilteringFormComponent {
  agencyService: AgencyManagementService = inject(AgencyManagementService);

  showForm = false;  
  applyForm = new FormGroup({
  isOpen: new FormControl(false),
  manager: new FormControl(''),
  zone: new FormControl(''),
  });

  toggleForm() {
    this.showForm = !this.showForm;  
  }

  submitApplication() {
    const formValues = this.applyForm.value;
    this.agencyService.filterAgencyList(formValues.zone, formValues.isOpen);
  }
    
}
 