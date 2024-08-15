import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
 
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WorkingHours } from '../working-hours';
import {Emploie} from "../emploie"; 
import {MapComponent} from "../map/map.component";
import {GeoLocation} from "../geo-location";
@Component({
  selector: 'app-agency-creation',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,MapComponent],
  templateUrl: './agency-creation.component.html',
  styleUrl: './agency-creation.component.css'
})
export class AgencyCreationComponent {
  formGroup: FormGroup;
  steps = [
    { label: 'General data' },
    { label: 'schedual' },
    { label: 'location' }, 
    { label: 'employees' }
  ];
  currentStep = 0;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  

 

  constructor(private fb: FormBuilder) {

    

    
    this.currentStep = 0;
   this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.formGroup = this.fb.group({
      email: [''],
      zone: [''],
      coomune: [''],
      description: [''],
      address: [''],
      phone: [''],
      schedule: this.fb.group(this.initializeSchedule())
      
    });
  }
  get scheduleFormGroup(): FormGroup {
    return this.formGroup.get('schedule') as FormGroup;
  }
  goToStep(index: number) {
    this.currentStep = index;
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }
  initializeSchedule(): { [key: string]: FormGroup } {
    const controls: { [key: string]: FormGroup } = {};
    this.days.forEach(day => {
   
      controls[day] = this.fb.group({
        morningSession: this.fb.group({
          from: ['08:00'],
          to: ['12:00'] 
        }),
        eveningSession: this.fb.group({
          from: ['13:00'],
          to: ['17:00']
        })
      });
    });
    return controls;
  }
}
 
