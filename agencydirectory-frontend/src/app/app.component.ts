import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import {CapfiHeaderComponent} from './capfi-header/capfi-header.component';
import {SingleAgencyComponent} from './single-agency/single-agency.component'; 
import {AgencyListComponent} from './agency-list/agency-list.component';
import {FilteringFormComponent} from './filtering-form/filtering-form.component' 
import {CartographieComponent} from './cartographie/cartographie.component'
import  {EmployeeSliderComponent} from "./employee-slider/employee-slider.component"
import {EmployeCardComponent} from "./employe-card/employe-card.component"
import {EmployeeGridComponent} from "./employee-grid/employee-grid.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CapfiHeaderComponent,SingleAgencyComponent,AgencyListComponent,FilteringFormComponent,CartographieComponent,EmployeeSliderComponent,EmployeCardComponent,EmployeeGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})
export class AppComponent {
  title = 'agencydirectory-frontend';
}
