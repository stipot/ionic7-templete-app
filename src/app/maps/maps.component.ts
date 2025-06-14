import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare const ymaps: any; // Глобальное объявление

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit {
  pageTitle = "YandexMap";
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapWithMarker', { static: false }) mapWithMarker!: ElementRef;
  constructor(private translate: TranslateService) {}
  clickedCoords: string = '';

  ngAfterViewInit() {
    this.loadYandexMap();
    setTimeout(() => {
      const annoyingElements = document.querySelectorAll('.translate-tooltip-mtz, .translate-button-mtz');
      annoyingElements.forEach(el => el.remove());
    }, 1000);
  }
  
// Загрузка самой карты
  loadYandexMap() {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.type = 'text/javascript';
    script.onload = () => this.initMap();
    document.head.appendChild(script);
  }

  initMap() {
    ymaps.ready(() => {
      // Карта 1: Базовая, просто сам макет
      new ymaps.Map(this.mapContainer.nativeElement, {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors: ['drag', 'multiTouch']
      });
  
      // Карта 2: С меткой
      const mapWithPlacemark = new ymaps.Map(this.mapWithMarker.nativeElement, {
        center: [55.751574, 37.573856],
        zoom: 10,
        controls: ['zoomControl']
      });
  
      // Статичная метка
      const defaultPlacemark = new ymaps.Placemark(
        [55.751574, 37.573856],
        {
          hintContent: 'Москва!',
          balloonContent: 'Столица России'
        },
        {
          preset: 'islands#icon',
          iconColor: 'darkblue'
        }
      );
      mapWithPlacemark.geoObjects.add(defaultPlacemark);
  
      let dynamicPlacemark: any = null;
  
      mapWithPlacemark.events.add('click', (e: any) => {
        const coords = e.get('coords');
  
        if (dynamicPlacemark) {
          mapWithPlacemark.geoObjects.remove(dynamicPlacemark);
        }

        dynamicPlacemark = new ymaps.Placemark(
          coords,
          {
            balloonContent: `Кликнули здесь: [${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}]`
          },
          {
            preset: 'islands#dotIcon',
            iconColor: 'darkblue'
          }
        );
  
        mapWithPlacemark.geoObjects.add(dynamicPlacemark);
        dynamicPlacemark.balloon.open();
      });
    });
  }
}