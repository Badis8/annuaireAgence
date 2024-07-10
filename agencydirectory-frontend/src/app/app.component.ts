import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CapfiHeaderComponent} from './capfi-header/capfi-header.component';
import {SingleAgencyComponent} from './single-agency/single-agency.component'; 
import {AgencyListComponent} from './agency-list/agency-list.component';
import {FilteringFormComponent} from './filtering-form/filtering-form.component' 
import {CartographieComponent} from './cartographie/cartographie.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CapfiHeaderComponent,SingleAgencyComponent,AgencyListComponent,FilteringFormComponent,CartographieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agencydirectory-frontend';
}
