import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements AfterViewInit {
  slides = [
    {
      image: './assets/sample-images/prikol2.jpg',
      title: 'Это приложение создано с использованием Ionic 7.',
      paragraphs: [
        'Создано командой IonicThemes, чтобы помочь вам начать разработку.',
        'У нас есть множество обучающих материалов!'
      ]
    },
    {
      image: './assets/sample-images/prikol.jpg',
      title: 'Как использовать шаблон?',
      paragraphs: [
        'Создавайте качественные и быстрые приложения на Ionic.',
        'Переиспользуйте и кастомизируйте компоненты.'
      ]
    },
    {
      image: './assets/sample-images/prikol3.jpg',
      title: 'Какие компоненты доступны?',
      paragraphs: [
        'Вкладки, формы, аутентификация и многое другое.',
        'Подходит для любых сценариев: еда, недвижимость и т.д.'
      ]
    }
  ];

  swiperRef: any;

  ngAfterViewInit() {
  this.swiperRef = document.querySelector('swiper-container')?.swiper;
  new Swiper('.intro-swiper', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
}

  

  ,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
    });
  }
}
