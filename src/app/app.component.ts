import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { TranslateService } from '@ngx-translate/core';
// import { title } from 'process';
// import { url } from 'inspector';
// import { Icon } from 'ionicons/dist/types/components/icon/icon';

register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'MAP.YANDEXMAPS', url: '/maps', icon: ''},
    { title: 'FrontPage', url: '/front-layout', icon: 'front-layout' },
    { title: 'Settings', url: '/settings', icon: '' },
    { title: 'Miniblog', url: '/miniblog', icon: '' },
    { title: 'Intro', url: '/intro', icon: '' },
    { title: 'Water-tracker', url: '/water-tracker', icon: '' },
    { title: 'Kanban', url: '/kanban', icon: '' },
    { title: 'Mood calendar', url: '/mood-calendar', icon: '' },
    { title: 'TERMS_TITLE', url: '/terms-of-service', icon: '' },
    { title: 'PRIVACY_TITLE', url: '/privacy-policy', icon: 'battery-full-outline' },
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
    { title: 'ToDo task', url: '/todo-task', icon: 'todo-task'},
    { title: 'VideoPlayer', url: '/videoplayer', icon: '' },
    { title: 'filters', url: '/filters', icon: 'reader-outline' },
    { title: 'Validations', url: '/validations', icon: '' },
    { title: 'barcode-scanner', url: '/barcode-scanner', icon: '' },
    { title: 'scilink', url: '/scilink', icon: '' },
    { title: 'camera', url: '/camera', icon: '' },
    { title: 'DragAndDrop', url: '/drag-and-drop', icon: '' },
    { title: 'mplayer', url: '/mplayer', icon: '' },
    { title: 'File-viewer', url: '/file-viewer', icon: '' },
    { title: 'Shopping', url: '/shopping', icon: '' },
    // Добавляем поле для перехода на страницу пометок
    { title: 'Компоненты в стадии разработки:', url: '/front-layout', icon: '' },
    { title: 'Inbox', url: '/folder/inbox', icon: 'входящие' },
    { title: 'Deals', url: '/deals', icon: '' },
    { title: 'Fashion', url: '/fashion', icon: '' },
    { title: 'Profile', url: '/profil', icon: '' },
    { title: 'RSA', url: '/rsa', icon: ''},
  ];
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ru');
    this.translate.addLangs(['en',"ru"])
    this.translate.use('ru');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
