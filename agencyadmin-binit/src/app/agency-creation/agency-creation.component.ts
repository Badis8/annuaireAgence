import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
 
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WorkingHours } from '../working-hours';
import {Emploie} from "../emploie"; 
import {MapComponent} from "../map/map.component";
import {GeoLocation} from "../geo-location";
import { Employe } from '../employee'; 
import { v4 as uuidv4 } from 'uuid'; 
import { AgencyManagementService } from '../agency-management.service';
import { AgencyRequest } from '../agency-request';
import { KeycloackService } from '../keycloack.service';
@Component({
  selector: 'app-agency-creation',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,MapComponent],
  templateUrl: './agency-creation.component.html',
  styleUrl: './agency-creation.component.css'
})
export class AgencyCreationComponent { 
  selectedImage: File | null = null;
  selectedFileName: string | undefined;
  employeImageName:string|undefined;
  selectedFileManagerName:string | undefined;
  formGroup: FormGroup; 
  tokenManger:KeycloackService=inject(KeycloackService);
  employees:Array<Employe>=[];
  selectedImageManager:File|null=null;
  steps = [
    { label: 'General data' },
    { label: 'schedual' },

    { label: 'location' }, 
    { label: 'manager' },
    { label: 'employees' }
  ];
  currentStep = 0;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  

  location: GeoLocation | null = null;  
  agencyService: AgencyManagementService = inject(AgencyManagementService); 
  selectedEmployeeImage: File | null = null; 
  employeeImages:Array<File>|null=[];
  constructor(private fb: FormBuilder) {

    

    
    this.currentStep = 0;
   this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.formGroup = this.fb.group({
 
      zone: [''],
      commune: [''],
      address: [''],
      phone:[''],
      phoneE: [''],
      emailE: [''],
      job: [''],
      fullName:[''],
      phoneM: [''],
      emailM: [''],
      jobM: [''],
      fullNameMa:[''],
    
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.selectedImage = file; 
        this.selectedFileName = file.name;
    } 
  } 
  onManagerSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.selectedImageManager = file; 
        this.selectedFileManagerName=file.name;
 
    } 
  }
  onSubmit() { 
  
    const defaultAvailability: WorkingHours = {
      morningSession: {
        from: '09:00',  
        to: '12:00'    
      },
      eveningSession: {
        from: '13:00',  
        to: '17:00'     
      }
    };
    if (this.location) {

      const agencyRequest: AgencyRequest = {
        zone: this.formGroup.get('zone')?.value,
        workingHours: this.scheduleFormGroup.value,
        address: this.formGroup.get('address')?.value,
        manager: {
          fullName: this.formGroup.get('fullNameMa')?.value,
          phoneNumber: this.formGroup.get('phoneM')?.value,
          email: this.formGroup.get('emailM')?.value,
          job: this.formGroup.get('jobM')?.value,
          employeID: uuidv4(),
          availability: defaultAvailability
        },
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        commune: this.formGroup.get('commune')?.value, 
        phoneNumber: this.formGroup.get('phone')?.value,
        employees: this.employees
      };

      const token = this.tokenManger.Token;  
      const formData = new FormData(); 
      if(this.selectedImage != null){ 
      formData.append('image', this.selectedImage);  
    } 

      
      formData.append('agency', new Blob([JSON.stringify(agencyRequest)], { type: 'application/json' }));
 
    if (this.selectedImageManager) { 
      const originalFileName = this.selectedImageManager.name;
      const fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
 
      const newFileName = `${agencyRequest.manager.employeID}${fileExtension}`;
      const renamedFile = new File([this.selectedImageManager], newFileName, {
          type: this.selectedImageManager.type,
          lastModified: this.selectedImageManager.lastModified,
      });
   
      this.employeeImages?.push(renamedFile);
    }
    this.employeeImages?.forEach((file) => {
      formData.append('employeeImages', file);
    });
      this.agencyService.createAgency(formData, token)
        .then(() => {
          console.log('Agency created successfully!');
        })
        .catch(error => {
          console.error('Error creating agency:', error);
        });
    } else {
      console.error('Form is invalid or location is not set.');
      Object.keys(this.formGroup.controls).forEach(key => {
        const control = this.formGroup.get(key);
        if (control) {
          console.log(`Control: ${key}`);
          console.log('Value:', control.value);
          console.log('Valid:', control.valid);
          console.log('Errors:', control.errors);
        }
      });
  
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
  addEmployee() { 
    const newEmployee:Employe = {
      fullName: this.formGroup.get('fullName')?.value,
      phoneNumber: this.formGroup.get('phoneE')?.value,
      email: this.formGroup.get('emailE')?.value,
      job: this.formGroup.get('job')?.value,
      employeID: uuidv4(),  
      availability: {
        morningSession: {
          from: '09:00',  
          to: '12:00',     
        },
        eveningSession: {
          from: '13:00',   
          to: '17:00',    
        }
      }
    };
    
    if (this.selectedEmployeeImage) { 
      const originalFileName = this.selectedEmployeeImage.name;
      const fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
 
      const newFileName = `${newEmployee.employeID}${fileExtension}`;
      const renamedFile = new File([this.selectedEmployeeImage], newFileName, {
          type: this.selectedEmployeeImage.type,
          lastModified: this.selectedEmployeeImage.lastModified,
      });
   
      this.employeeImages?.push(renamedFile);
    }
    this.employees.push(newEmployee);
    this.selectedEmployeeImage=null;
    this.formGroup.get('fullName')?.reset();
    this.formGroup.get('phoneE')?.reset();
    this.formGroup.get('emailE')?.reset();
    this.formGroup.get('job')?.reset();
    
  }
  
  removeEmployee(index: number) {
    this.employees.splice(index, 1);
  } 


  onLocationSelected(geoLocation: GeoLocation) {
    this.location = geoLocation;  
    console.log('Location selected:', geoLocation);
  } 
  onEmployeeImageSelected(event: any) {
    this.selectedEmployeeImage = event.target.files[0];
   this.employeImageName=this.selectedEmployeeImage?.name;
  }

}
 
