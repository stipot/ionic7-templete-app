import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare const ymaps: any; // Глобальное объявление

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit {
  pageTitle = "YandexMap";
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  ngAfterViewInit() {
    this.loadYandexMap();
  
    setTimeout(() => {
      const annoyingElements = document.querySelectorAll('.translate-tooltip-mtz, .translate-button-mtz, .some-other-overlay-class');
      annoyingElements.forEach(el => el.remove());
    }, 1000); 
  }
  
  initMap() {
    ymaps.ready(() => {
      new ymaps.Map(this.mapContainer.nativeElement, {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors: ['drag', 'multiTouch']
      });
    });
  }
  
  loadYandexMap() {
    if (typeof ymaps !== 'undefined') {
      this.initMap();
      return;
    }
  
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.onload = () => this.initMap();
    document.head.appendChild(script);
  }  
}