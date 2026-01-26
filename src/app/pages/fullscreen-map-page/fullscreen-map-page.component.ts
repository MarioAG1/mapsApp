import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { DecimalPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styleUrls: ['./fullscreen-map-page.component.css'],
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  zoom = signal(14);
  map = signal<mapboxgl.Map | null>(null);

  zoomEffect = effect(() => {
    if (!this.map()) {
      return;
    }
    // this.map()?.setZoom(this.zoom()); Lo mismo pero sin animacion
    this.map()?.zoomTo(this.zoom());
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) {
      return;
    }
    // Opcional, para hacer que tarde un poco para cargar bien
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    this.map.set(map);
  }
}
