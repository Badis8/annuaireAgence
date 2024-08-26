import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, afterNextRender, inject } from '@angular/core';
import { LngLatBounds, Map, Marker } from 'maplibre-gl';
import { MapPresenter } from './services/MapService';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { AgencyLocationManagementService } from '../agency-location-management.service';
import { AgencyLocation } from '../agency-location';
import { MapServiceImplementation } from './services/MapServiceImplementation';
import { AgencyListComponent } from '../agency-list/agency-list.component'; 
import {MapServiceLeafletImplementation} from './services/MapServiceLeafletImplementation'
import {FilteringFormComponent} from "../filtering-form/filtering-form.component"
import { RouterOutlet,RouterLink } from '@angular/router';
import { OnClickHandlerService } from '../on-click-handler.service';
@Component({
  selector: 'app-cartographie',
  standalone: true,
  imports: [AgencyListComponent,FilteringFormComponent,RouterOutlet],
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.css'],
  providers: [MapServiceLeafletImplementation]
}) 
export class CartographieComponent implements OnDestroy ,AfterViewInit{
  map: Map | undefined;
  agencyService: AgencyLocationManagementService = inject(AgencyLocationManagementService);
  mapPresenter: MapPresenter = inject(MapServiceLeafletImplementation);
  overridenClickHandlerService: OnClickHandlerService = inject(OnClickHandlerService);

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  locations: AgencyLocation[] = [];
  
  ngOnInit(): void { 
    
    this.agencyService.agencyFiltered.subscribe((filteredAgencies: AgencyLocation[]) => {
      if (this.map) {
          this.mapPresenter.pinPointMarkers(this.map,filteredAgencies)
 
      }
    });
    this.agencyService.agencyFiltered.subscribe((filteredAgencies: AgencyLocation[]) => {
      if (this.map) {
          this.mapPresenter.pinPointMarkers(this.map,filteredAgencies)
      }
    });
    

    this.overridenClickHandlerService.agencyClicked.subscribe((agencyClicked: string) => {
      const agency = this.findAgencyById(agencyClicked);
    if (agency) {
  
      this.mapPresenter.zoomToLocation(this.map!, agency.latitude, agency.longitude, 15);
    } else {
      console.log('Agency not found');
    }
  })}



  
   constructor(){
    
}
  ngAfterViewInit(): void {
   
    this.agencyService.getRemoteAgencysLocations().then((agenciesLocations: AgencyLocation[]) => {
      this.locations = agenciesLocations;
      this.map = this.mapPresenter.initMap(this.agencyService.filteredAgencies,this.mapContainer);
      this.mapPresenter.pinPointMarkers(this.map,  this.agencyService.filteredAgencies)  
    });
  } 
 
  ngOnDestroy() {
    this.map?.remove();
   
  }

  onAgencyClickedInGrandparent(agencyId: string): void {

    const agency = this.findAgencyById(agencyId);
    if (agency) {
  
      this.mapPresenter.zoomToLocation(this.map!, agency.latitude, agency.longitude, 15);
    } else {
      console.log('Agency not found');
    }
  }
  private findAgencyById(agencyId: string): AgencyLocation | undefined {
    return this.locations.find(agency => agency.agencyID === agencyId);
  }
}