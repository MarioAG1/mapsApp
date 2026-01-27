import mapboxgl from 'mapbox-gl';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '../../../environments/environment.development';

mapboxgl.accessToken = environment.mapboxKey;
@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) {
      return;
    }
    // Opcional, para hacer que tarde un poco para cargar bien
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      center: [-4.027583, 39.862333], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 14, // starting zoom
    });

    const marker = new mapboxgl.Marker({ draggable: false, color: 'black' })
      .setLngLat([-4.027583, 39.862333])
      .addTo(map);

    marker.on('dragend', (event) => {});
    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {}
}
