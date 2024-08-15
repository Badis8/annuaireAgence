import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocation } from '../geo-location';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true 
})
export class MapComponent implements AfterViewInit {
  private map:any;
  @Output() dataEvent = new EventEmitter<GeoLocation>();
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.handleMapClick(event);
    });
 
  } 
  
 

  private handleMapClick(event: L.LeafletMouseEvent): void {
    const latlng = event.latlng;
    const geoLocation: GeoLocation = {
      latitude: latlng.lat,
      longitude: latlng.lng
    };
 

    
    this.dataEvent.emit(geoLocation);
  }
 
}