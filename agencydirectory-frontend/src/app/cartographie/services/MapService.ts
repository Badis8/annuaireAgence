import { ElementRef } from "@angular/core";
import { AgencyLocation } from "../../agency-location";

export interface MapPresenter {
    initMap(markers: AgencyLocation[],mapContainer: ElementRef<HTMLElement>): any; //i dont like the fact that i use any but each each library uses its own type
    
    pinPointMarkers(map:any,markers:AgencyLocation[]):void 

    initialPosition(markers:AgencyLocation[]):[number, number] 

    zoomToLocation(map: any, latitude: number, longitude: number, zoomLevel: number  ): void 

  }