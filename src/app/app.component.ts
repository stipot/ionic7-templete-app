import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { TranslateService } from '@ngx-translate/core';

register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'FrontPage', url: '/front-layout', icon: 'front-layout' },
    { title: 'Settings', url: '/settings', icon: '' },
    { title: 'Intro', url: '/intro', icon: '' },
    { title: 'Kanban', url: '/kanban', icon: '' },
    { title: 'Mood calendar', url: '/mood-calendar', icon: '' },
    { title: 'Terms of service', url: '/terms-of-service', icon: '' },
    { title: 'policy-privacy', url: '/privacy-policy', icon: 'battery-full-outline' },
    { title: 'Signup', url: '/signup', icon: '' },
    { title: 'Login', url: '/login', icon: '' },
    { title: 'Forgot password', url: '/forgot-password', icon: '' },
    { title: 'User', url: '/user', icon: '' },
    { title: 'Contact card', url: '/contact-card', icon: '' },
    { title: 'Recipes', url: '/recipes', icon: '' },
    { title: 'CRYPTO_MODULE.COMPONENT_TITLE', url: '/cryptorates', icon: '' },
    { title: 'News', url: '/rss-data', icon: '' },
    { title: 'Notes', url: '/notes', icon: 'Пометки' },
    { title: 'ToDo list', url: '/todo-list', icon: 'todo-list' },
    { title: 'Forms', url: '/forms', icon: '' },
    { title: 'VideoPlayer', url: '/videoplayer', icon: '' },
    { title: 'filters', url: '/filters', icon: 'reader-outline' },
    { title: 'Validations', url: '/validations', icon: '' },
    { title: 'barcode-scanner', url: '/barcode-scanner', icon: '' },
    { title: 'scilink', url: '/scilink', icon: '' },
    { title: 'Компоненты в стадии разработки:', url: '/front-layout', icon: '' },
    { title: 'camera', url: '/camera', icon: '' },
    { title: 'Inbox', url: '/folder/inbox', icon: 'входящие' },
    { title: 'DragAndDrop', url: '/drag-and-drop', icon: '' },
    // Добавляем поле для перехода на страницу пометок
    { title: 'Deals', url: '/deals', icon: '' },
    { title: 'Fashion', url: '/fashion', icon: '' },
    { title: 'Profile', url: '/profil', icon: '' },
    { title: 'mplayer', url: '/mplayer', icon: '' },
    { title: 'notes', url: '/notes', icon: 'Заметки' },
    { title: 'File-viewer', url: '/file-viewer', icon: '' },

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
