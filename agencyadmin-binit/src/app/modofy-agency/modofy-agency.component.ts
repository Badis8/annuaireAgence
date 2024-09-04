import { Component, inject, Input, OnInit } from '@angular/core';
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
import { AgencyDetails } from '../agency-details';
import { AgencyLocation } from '../agency-location';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../location.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-modofy-agency',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,MapComponent],
  templateUrl: './modofy-agency.component.html',
  styleUrl: './modofy-agency.component.css'
})
export class ModofyAgencyComponent implements OnInit{
 
  agencyDetails?: AgencyDetails |null;
  AgencyLocation?: AgencyLocation|null|undefined;
   
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
  locationservice: LocationService = inject(LocationService); 
 
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private router: Router) {

 
    
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
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.agencyService.getAgencyById(id,this.tokenManger.Token).then(data => {
          this.agencyDetails = data;
          this.populateForm(this.agencyDetails);
          console.log(this.agencyDetails);
          if(this.agencyDetails!=null){
          
          this.employees=this.agencyDetails.employees;
        }

        });
        this.locationservice.getAgencyById(id).then(data=>{
          this.AgencyLocation=data;

        })
      }
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
    if (this.AgencyLocation) {

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
        latitude: this.AgencyLocation.latitude,
        longitude: this.AgencyLocation.longitude,
        commune: this.formGroup.get('commune')?.value, 
        phoneNumber: this.formGroup.get('phone')?.value,
        employees: this.employees
      };

      console.log(agencyRequest)
      const token = this.tokenManger.Token;  
      const formData = new FormData(); 
   

      
      formData.append('agencyRequest', new Blob([JSON.stringify(agencyRequest)], { type: 'application/json' }));
      this.agencyService.updateAgency(this.agencyDetails?.id,formData, token);
 
 
 
  
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
    
 
    this.employees.push(newEmployee);
 
    this.formGroup.get('fullName')?.reset();
    this.formGroup.get('phoneE')?.reset();
    this.formGroup.get('emailE')?.reset();
    this.formGroup.get('job')?.reset();
    
  }
  
  removeEmployee(index: number) {
    this.employees?.splice(index, 1);
  } 


  onLocationSelected(geoLocation: GeoLocation) { 
    if(this.AgencyLocation!=null && this.AgencyLocation!=undefined){
    this.AgencyLocation.latitude=geoLocation.latitude;
    this.AgencyLocation.longitude=geoLocation.longitude;

}
  }
 
  populateForm(agency: AgencyDetails|null) {
    if(agency!=null){ 
    this.formGroup.patchValue({

      zone: agency.zone,
      commune: agency.commune,
      address: agency.address,
      phone:agency.phoneNumber,
      phoneM: agency.manager.phoneNumber,
      emailM: agency.manager.email,
      jobM: agency.manager.job,
      fullNameMa: agency.manager.fullName,
 
    });
  }
}


}
 

 