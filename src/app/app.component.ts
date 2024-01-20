import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'входящие' },
    { title: 'outbox', url: '/folder/outbox', icon: 'исходящие' },
    { title: 'favorites', url: '/folder/favorites', icon: 'понравившиеся' },
    { title: 'archived', url: '/folder/archived', icon: 'архив' },
    { title: 'trash', url: '/folder/trash', icon: 'корзина' },
    { title: 'spam', url: '/folder/spam', icon: 'предупреждения/спам' },
    // Добавляем поле для перехода на страницу пометок
    { title: 'notes', url: '/notes', icon: 'Пометки' },
    { title: 'Fashion', url:'/fashion',icon: 'fashion'},
    { title: 'filters', url: '/filters', icon: 'reader-outline' },
    { title: 'validations', url: '/validations', icon: '' },
    { title: 'privacy-policy', url: '/privacy-policy', icon: 'battery-full-outline' },
    { title: 'login', url: '/login', icon: '' },
    { title: 'ToDo list', url: '/todo-list', icon: 'todo-list' },
    { title: 'barcode-scanner', url: '/barcode-scanner', icon: '' },
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
