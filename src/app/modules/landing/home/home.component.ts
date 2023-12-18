import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { CompanyService } from '../../../shared/services/company.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-landing-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class LandingHomeComponent implements OnInit {
  urlLogo = `${environment.api}/public/logo/`;
  urlBuilding = `${environment.api}/public/building/`;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v12';

  lat = 36.3398;
  lng = 10.7787;
  selectedItem: any;
  authenticated: boolean;
  constructor(private companyService: CompanyService) {}
  ngOnInit() {
    this.authenticated = !!localStorage.getItem('accessToken');
    this.companyService.getListCompaniesMap().subscribe((data) => {
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
        console.info(event);
      });
      const geojson = {
        type: 'FeatureCollection',
        features: data,
      };
      for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker rounded-full border-orange-500 border-4 cursor-pointer ';
        el.style.backgroundImage = `url(${this.urlLogo + marker.properties.avatar})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
        el.style.backgroundPosition = 'center';
        el.style.backgroundRepeat = 'no-repeat';
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        el.addEventListener('click', () => {
          this.selectedItem = marker.properties;
        });

        // Add markers to the map.
        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(this.map);
      }
    });
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
