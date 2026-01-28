import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{ lng: number; lat: number }>();
  zoom = input<number>(14);
  pitch = input<number>(15);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) {
      return;
    }
    // Opcional, para hacer que tarde un poco para cargar bien
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat(),
      zoom: this.zoom(), // starting zoom
      interactive: false,
      pitch: this.pitch(),
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
