import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss'],
})
export class LocalisationComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v12';

  lat = 36.3398;
  lng = 10.7787;
  longitude: number;
  latitude: number;
  constructor(public matDialogRef: MatDialogRef<LocalisationComponent>) {}
  ngOnInit() {
    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZHBpZXRyb2NhcmxvIiwiYSI6ImNram9tOGFuMTBvb3oyeXFsdW5uYmJjNGQifQ._zE6Mub0-Vpl7ggMj8xSUQ',
      container: 'map',
      style: this.style,

      zoom: 8,
      center: [this.lng, this.lat],
    });
    // Add map controls
    this.map.addControl(
      new MapboxGeocoder({
        accessToken:
          'pk.eyJ1IjoiZHBpZXRyb2NhcmxvIiwiYSI6ImNram9tOGFuMTBvb3oyeXFsdW5uYmJjNGQifQ._zE6Mub0-Vpl7ggMj8xSUQ',
        mapboxgl: mapboxgl,
      }),
    );
    this.map.on('click', (event) => {
      this.longitude = event.lngLat.lng;
      this.latitude = event.lngLat.lat;
    });
  }

  discard() {
    this.matDialogRef.close();
  }

  confirm() {
    if (this.latitude && this.longitude) {
      this.matDialogRef.close({ latitude: this.latitude, longitude: this.longitude });
    }
  }
}
