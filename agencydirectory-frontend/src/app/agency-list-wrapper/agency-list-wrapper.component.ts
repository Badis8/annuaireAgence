import { Component } from '@angular/core';
import {AgencyListComponent} from '../agency-list/agency-list.component'
@Component({
  selector: 'app-agency-list-wrapper',
  standalone: true,
  imports: [AgencyListComponent],
  templateUrl: './agency-list-wrapper.component.html',
  styleUrl: './agency-list-wrapper.component.css'
})
export class AgencyListWrapperComponent {

}
