import { ElementRef, Injectable } from "@angular/core";
import { AgencyLocation } from "../../agency-location";
import { MapPresenter } from "./MapService";
import {map, Map, tileLayer} from 'leaflet';
@Injectable()
export class MapServiceLeafletImplementation implements MapPresenter {
  constructor() {
 
  }
  pinPointMarkers(map: Map, markers: AgencyLocation[]): void {
    
  }
  initialPosition(markers: AgencyLocation[]): [number, number] {
    if (markers.length === 0) {
      return [39.8282,-98.5795]  
    }
  
    let sumLatitude = 0;
    let sumLongitude = 0;
  
    for (const marker of markers) {
      sumLatitude += marker.latitude;
      sumLongitude += marker.longitude;
    }
  
    const mediumLatitude = sumLatitude / markers.length;
    const mediumLongitude = sumLongitude / markers.length;
    
    return [mediumLongitude, mediumLatitude];
  }
  
  initMap(markers: AgencyLocation[],mapContainer: ElementRef<HTMLElement>): Map {
    mapContainer.nativeElement.style.height = '100%';
    let leafletMap = map(mapContainer.nativeElement, {
      center:[39.8282,-98.5795]  ,
      zoom: 3 
    });
    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 300,
      minZoom: 5
    });

    tiles.addTo(leafletMap);
    return leafletMap;
  }

 
     
  fitBoundsToMarkers(map: Map, markers: AgencyLocation[]): void {
  
  }
  
   
}