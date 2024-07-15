import { ElementRef, Injectable } from "@angular/core";
import { AgencyLocation } from "../../agency-location";
import { MapPresenter } from "./MapService";
import {LatLngBounds, map, Map, marker, tileLayer,icon, Marker} from 'leaflet';

@Injectable({
  providedIn: 'root' // why, my theopry is it makes it a singleton
})
export class MapServiceLeafletImplementation implements MapPresenter {
   
  constructor() {
     
  }
  pinPointMarkers(map: Map, markers: AgencyLocation[]): void {
    map.eachLayer(layer => {
      if (layer instanceof Marker) {
        map.removeLayer(layer);
      }
    });

    markers.forEach(location => {
      marker([location.latitude, location.longitude]).addTo(map);
    });
    this.fitBoundsToMarkers(map, markers);
  }

  initialPosition(markers: AgencyLocation[]): [number, number] {
    if (markers.length === 0) {
      return[0,0]  
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
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
   Marker.prototype.options.icon = iconDefault;
    mapContainer.nativeElement.style.height = '100%';
    let leafletMap = map(mapContainer.nativeElement, {
    
      zoom: 3 
    });
    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 4000,
      minZoom: 1
    });

    tiles.addTo(leafletMap);
    return leafletMap;
  }

 
     
  fitBoundsToMarkers(map: Map, markers: AgencyLocation[]): void {
    if (markers.length === 0) return;

    const bounds = new LatLngBounds(
      markers.map(location => [location.latitude, location.longitude] as [number, number])
    );

    map.fitBounds(bounds, { padding: [50, 50] });
  }
  
    zoomToLocation(map: Map, latitude: number, longitude: number, zoomLevel: number = 15): void {
    map.setView([latitude, longitude], zoomLevel);
  }
}