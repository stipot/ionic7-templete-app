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
    { title: 'Face Detector', url: '/face-detector', icon: 'scan' },  // ДОБАВЛЕНО
    { title: 'FRONTPAGE.COMPONENT_TITLE', url: '/front-layout', icon: 'grid' },
    { title: 'SETTINGS.COMPONENT_TITLE', url: '/settings', icon: 'settings' },
    { title: 'INTRO.COMPONENT_TITLE', url: '/intro', icon: 'easel' },
    { title: '2048GAME.COMPONENT_TITLE', url: '/game-2048', icon: 'game-controller' },
    { title: 'calc.name', url: '/calc', icon: 'calculator' },
    { title: 'MAP.YANDEXMAPS', url: '/maps', icon: 'map' },
    { title: 'GAZON.MENU', url: '/gazon', icon: 'sync' },
    { title: 'MINIBLOG.COMPONENT_TITLE', url: '/miniblog', icon: 'book' },
    { title: 'KANBAN.COMPONENT_TITLE', url: '/kanban', icon: 'albums' },
    { title: 'RECIPES.COMPONENT_TITLE', url: '/recipes', icon: 'pizza' },
    { title: 'MOODCALENDAR.COMPONENT_TITLE', url: '/mood-calendar', icon: 'calendar' },
    { title: 'Miniblog', url: '/miniblog', icon: 'book' },
    { title: 'widget', url: '/widget', icon: 'finger-print' },    
    { title: 'CRYPTO_MODULE.COMPONENT_TITLE', url: '/cryptorates', icon: 'cash' },
    { title: 'NEWS.COMPONENT_TITLE', url: '/rss-data', icon: 'newspaper' },
    { title: 'NOTES.COMPONENT_TITLE', url: '/notes', icon: 'create' },
    { title: 'TODOLIST.COMPONENT_TITLE', url: '/todo-list', icon: 'checkmark-done' },
    { title: 'TODOTASK.COMPONENT_TITLE', url: '/todo-task', icon: 'checkmark-done-circle' },
    { title: 'VIDEOPLAYER.COMPONENT_TITLE', url: '/videoplayer', icon: 'videocam' },
    { title: 'MPLAYER.COMPONENT_TITLE', url: '/mplayer', icon: 'musical-notes' },
    { title: 'SCILINK.COMPONENT_TITLE', url: '/scilink', icon: 'earth' },
    { title: 'BARCODE-SCANNER.COMPONENT_TITLE', url: '/barcode-scanner', icon: 'barcode' },
    { title: 'CAMERA.COMPONENT_TITLE', url: '/camera', icon: '' },
    { title: 'File-viewer', url: '/file-viewer', icon: '' },
    { title: 'Validations', url: '/validations', icon: '' },
    { title: 'filters', url: '/filters', icon: 'reader-outline' },
    { title: 'DragAndDrop', url: '/drag-and-drop', icon: '' },
    { title: 'Shopping', url: '/shopping', icon: '' },
    { title: 'RSA', url: '/rsa', icon: '' },
    { title: 'Signup', url: '/signup', icon: '' },
    { title: 'Login', url: '/login', icon: '' },
    { title: 'Forgot password', url: '/forgot-password', icon: '' },
    { title: 'TERMS_TITLE', url: '/terms-of-service', icon: '' },
    {
      title: 'PRIVACY_TITLE',
      url: '/privacy-policy',
      icon: 'battery-full-outline',
    },
    { title: 'User', url: '/user', icon: '' },
    { title: 'Contact card', url: '/contact-card', icon: '' },
    // Добавляем поле для перехода на страницу пометок
    {
      title: 'DEVELOPMENT.COMPONENTS',
      url: '/front-layout',
      icon: '',
    },
    { title: 'Water-tracker', url: '/water-tracker', icon: 'water' },    
    { title: 'Inbox', url: '/folder/inbox', icon: 'входящие' },
    { title: 'Deals', url: '/deals', icon: '' },
    { title: 'Fashion', url: '/fashion', icon: '' },
    { title: 'Profile', url: '/profil', icon: '' },
  ];
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ru');
    this.translate.addLangs(['en', 'ru']);
    this.translate.use('ru');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}