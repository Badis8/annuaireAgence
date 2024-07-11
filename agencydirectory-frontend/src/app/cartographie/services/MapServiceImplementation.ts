import { ElementRef, Injectable } from "@angular/core";
import { AgencyLocation } from "../../agency-location";
import { LngLatBounds, Map, Marker } from 'maplibre-gl';
import { MapPresenter } from "./MapService";
@Injectable()
export class MapServiceImplementation implements MapPresenter {
 

  constructor() {
 
  }

 

  pinPointMarkers(map: Map, markers: AgencyLocation[]): void {
    markers.forEach(location => {
      new Marker({ color: "#FF0000" })
        .setLngLat([location.latitude, location.longitude])
        .addTo(map);
    });
    this.fitBoundsToMarkers(map,markers)
  }
  initialPosition(markers: AgencyLocation[]): [number, number] {
    if (markers.length === 0) {
      return [0,0] //default behaviour of the mapilier framework 
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
    const initialState = this.initialPosition(markers)
   return new Map({
      container: mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=C1KFxDLONNUAPhapsyha`,
      center: initialState,
      zoom: 20
    });

  }

     
  fitBoundsToMarkers(map: Map, markers: AgencyLocation[]): void {
    if (markers.length === 0) return;

    const bounds = new LngLatBounds();
    markers.forEach(location => {
      bounds.extend([location.longitude, location.latitude]);
    });

    map.fitBounds(bounds, { padding: 50 });
  }
  
   
}