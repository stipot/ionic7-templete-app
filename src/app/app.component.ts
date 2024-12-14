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
    { title: 'Intro', url: '/intro', icon: '' },
    { title: 'Profile', url: '/profil', icon: '' },
    { title: 'User', url: '/user', icon: '' },
    { title: 'Settings', url: '/settings', icon: '' },
    { title: 'Contact card', url: '/contact-card', icon: '' },
    { title: 'notes', url: '/notes', icon: 'Пометки' },
    { title: 'Login', url: '/login', icon: '' },
    { title: 'Signup', url: '/signup', icon: '' },
    { title: 'Terms of service', url: '/terms-of-service', icon: '' },
    { title: 'policy-privacy', url: '/privacy-policy', icon: 'battery-full-outline' },
    { title: 'Deals', url: '/deals', icon: '' },
    { title: 'Recipes', url: '/recipes', icon: '' },
    { title: 'Overview', url: '/owerview', icon: '' },
    { title: 'Fashion', url: '/fashion', icon: '' },
    { title: 'Forgot password', url: '/forgot-password', icon: '' },
    { title: 'RSS data', url: '/rss-data', icon: '' },
    { title: 'ToDo list', url: '/todo-list', icon: 'todo-list' },
    { title: 'Forms', url: '/forms', icon: '' },
    { title: 'filters', url:'/filters',icon: 'reader-outline'},
    { title: 'Validations', url: '/validations', icon: '' },
    { title: 'barcode-scanner', url: '/barcode-scanner', icon: '' },
    { title: 'front-layout', url: '/front-layout', icon: 'front-layout' },
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
