import { Component } from '@angular/core';
import {SingleAgencyDetailsService} from '../single-agency-details.service'
import { AgencyDetails } from '../agency-details';
import { ActivatedRoute } from '@angular/router';
import {EmployeeSliderComponent} from "../employee-slider/employee-slider.component";
import {AgencyCardComponent} from "../agency-card/agency-card.component"
import { CommonModule } from '@angular/common'; 
 
@Component({
  selector: 'app-agency-detail',
  standalone: true,
  imports: [EmployeeSliderComponent,AgencyCardComponent,CommonModule],
  templateUrl: './agency-detail.component.html',
  styleUrl: './agency-detail.component.css'
})
export class AgencyDetailComponent {
  agencyDetails: AgencyDetails | undefined;

  constructor(
    private route: ActivatedRoute,
    private singleAgencyDetailsService: SingleAgencyDetailsService
   
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const agencyId = params.get('id');
 
      if (agencyId) {
        this.singleAgencyDetailsService.getRemoteAgencysDetails(agencyId).then(details => {
          this.agencyDetails = details;        
        });
      }
    });
  }
}
 
