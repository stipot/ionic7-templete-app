import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { TranslateService } from '@ngx-translate/core';

register ();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'входящие' },

    // Добавляем поле для перехода на страницу пометок
    { title: 'Пометки', url: '/notes', icon: 'Пометки' },
    { title: 'Filters', url:'/filters',icon: 'reader-outline'},
    { title: 'Validations', url: '/validations', icon: '' },  
    { title: 'policy-privacy', url: '/privacy-policy', icon: 'battery-full-outline' },
    { title: 'Login', url: '/login', icon: '' },
    { title: 'Intro', url: '/intro', icon: '' },
  ];
  public labels = ['Семья', 'Друзья', 'Заметки', 'Работа', 'Путешествия', 'Напоминания'];
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ru');
    this.translate.use('ru');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}