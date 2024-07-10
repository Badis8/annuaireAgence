import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-filtering-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './filtering-form.component.html',
  styleUrl: './filtering-form.component.css'
})
export class FilteringFormComponent {
  applyForm = new FormGroup({
    isOpen: new FormControl(false),
    manager: new FormControl(''),
    zone: new FormControl(''),
  });

  submitApplication() {
 
    const formValues = this.applyForm.value;
    console.log('Is Open:', formValues.isOpen);
    console.log('Manager:', formValues.manager);
    console.log('Zone:', formValues.zone);
  
  }
}
