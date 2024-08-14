import { Component ,EventEmitter,Output,inject} from '@angular/core';
import { Agency } from '../agency';
import {SingleAgencyComponent} from '../single-agency/single-agency.component'; 
import { CommonModule } from '@angular/common';
import { AgencyManagementService} from '../agency-management.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';
import {FilteringFormComponent} from "../filtering-form/filtering-form.component"
@Component({
  selector: 'app-agency-list',
  standalone: true,
  imports: [SingleAgencyComponent,CommonModule,RouterLink,FilteringFormComponent],
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
 
  
export class AgencyListComponent {
  agencies: Agency[] = [];
  @Output() agencyClickedInParent = new EventEmitter<string>();
  agencyService: AgencyManagementService = inject(AgencyManagementService);
  constructor() {
    this.agencyService.getRemoteAgencys().then((agencies: Agency[]) => {
      this.agencies = agencies;
      

    });
   
  }
  onAgencyClicked(agencyId: string): void {
    this.agencyClickedInParent.emit(agencyId);
  }
}