import mapboxgl from 'mapbox-gl';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Marker } from '../../interface/marker.interface';
import { v4 as UUIDv4 } from 'uuid';

mapboxgl.accessToken = environment.mapboxKey;
@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

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

    // const marker = new mapboxgl.Marker({ draggable: false, color: 'black' })
    //   .setLngLat([-4.027583, 39.862333])
    //   .addTo(map);

    // marker.on('dragend', (event) => {});
    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => {
      this.mapClick(event);
    });

    this.map.set(map);
  }

  // Mi solucion, parece que es mejor
  // mapClick(event: mapboxgl.MapMouseEvent, map: mapboxgl.Map) {
  //   const color = '#xxxxxx'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));
  //   const coords = event.lngLat;
  //   new mapboxgl.Marker({ color: color }).setLngLat(coords).addTo(map);
  // }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) {
      return;
    }
    const map = this.map()!;
    const color = '#xxxxxx'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));
    const coords = event.lngLat;
    const mapboxMarker = new mapboxgl.Marker({ color: color }).setLngLat(coords).addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker,
    };

    this.markers.update((markers) => [newMarker, ...markers]);
  }
}
