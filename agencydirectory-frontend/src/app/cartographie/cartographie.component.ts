import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, afterNextRender, inject } from '@angular/core';
import { LngLatBounds, Map, Marker } from 'maplibre-gl';
import { MapPresenter } from './services/MapService';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { AgencyLocationManagementService } from '../agency-location-management.service';
import { AgencyLocation } from '../agency-location';
import { MapServiceImplementation } from './services/MapServiceImplementation';
import { AgencyListComponent } from '../agency-list/agency-list.component'; 
import {MapServiceLeafletImplementation} from './services/MapServiceLeafletImplementation'
@Component({
  selector: 'app-cartographie',
  standalone: true,
  imports: [AgencyListComponent],
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.css'],
  providers: [MapServiceImplementation]
}) 
export class CartographieComponent implements OnDestroy ,AfterViewInit{
  map: Map | undefined;
  agencyService: AgencyLocationManagementService = inject(AgencyLocationManagementService);
  mapPresenter: MapPresenter = inject(MapServiceImplementation);
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  locations: AgencyLocation[] = [];
  
  ngOnInit(): void {
    
  }

   constructor(){
    
}
  ngAfterViewInit(): void {
   
    this.agencyService.getRemoteAgencysLocations().then((agenciesLocations: AgencyLocation[]) => {
      this.locations = agenciesLocations;
      this.map = this.mapPresenter.initMap(this.locations,this.mapContainer);
      this.mapPresenter.pinPointMarkers(this.map,  this.locations )  
    });
  } 
 
  ngOnDestroy() {
    this.map?.remove();
   
  }

  
}