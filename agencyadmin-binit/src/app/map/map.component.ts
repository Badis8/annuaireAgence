import { Component, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocation } from '../geo-location';
import { Marker, icon } from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true 
})
export class MapComponent implements AfterViewInit {
  private map:any; 
  private marker: L.Marker | undefined;  
  @Input() initialLocation: GeoLocation | null|undefined = null;
  @Output() dataEvent = new EventEmitter<GeoLocation>();
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map); 
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
  }

  constructor() { }
 

  initializeMap(location?: GeoLocation): void {
    if (location) {
      const { latitude, longitude } = location;
      this.marker = L.marker([latitude, longitude]).addTo(this.map);
      this.map.setView([latitude, longitude], 15); 

    }
    }
    
 

  ngAfterViewInit(): void {
    this.initMap();
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.handleMapClick(event);
    });
    if (this.initialLocation) {
      this.initializeMap(this.initialLocation);
      this.dataEvent.emit(this.initialLocation);
       
    }
 
  } 
  
 

  private handleMapClick(event: L.LeafletMouseEvent): void {
    const latlng = event.latlng;
    const geoLocation: GeoLocation = {
      latitude: latlng.lat,
      longitude: latlng.lng
    };
 
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
 
    this.marker = L.marker([latlng.lat, latlng.lng]).addTo(this.map);
    this.dataEvent.emit(geoLocation);
  }
    
    
  }
 
 