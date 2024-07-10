import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, afterNextRender, inject } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { AgencyLocationManagementService } from '../agency-location-management.service';
import { AgencyLocation } from '../agency-location';

@Component({
  selector: 'app-cartographie',
  standalone: true,
  imports: [],
  templateUrl: './cartographie.component.html',
  styleUrls: ['./cartographie.component.css']
}) 
export class CartographieComponent implements OnDestroy {
  map: Map | undefined;
  agencyService: AgencyLocationManagementService = inject(AgencyLocationManagementService);
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  locations: AgencyLocation[] = [];
  
  ngOnInit(): void {
    
  }

   constructor(){

    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
      this.agencyService.getRemoteAgencysLocations().then((agenciesLocations: AgencyLocation[]) => {
      this.locations = agenciesLocations;
   });
   
    afterNextRender(() => {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=C1KFxDLONNUAPhapsyha`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    this.locations.forEach(location => {
      new Marker({ color: "#FF0000" })
        .setLngLat([location.latitude,location.longitude])
        .addTo(this.map!);
    });
  });
 
   }
  ngOnDestroy() {
    this.map?.remove();
  }

    

  
}