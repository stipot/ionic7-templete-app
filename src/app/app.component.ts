import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  public appPages = [
    { title: 'inbox', url: '/folder/inbox', icon: 'входящие' },
    { title: 'outbox', url: '/folder/outbox', icon: 'исходящие' },
    { title: 'favorutes', url: '/folder/favorites', icon: 'понравившиеся' },
    { title: 'archived', url: '/folder/archived', icon: 'архив' },
    { title: 'trash', url: '/folder/trash', icon: 'корзина' },
    { title: 'spam', url: '/folder/spam', icon: 'предупреждения/спам' },
    // Добавляем поле для перехода на страницу пометок
    { title: 'notes', url: '/notes', icon: 'Пометки' },
    { title: 'filters', url:'/filters',icon: 'reader-outline'},
    { title: 'validations', url: '/validations', icon: '' },  
    { title: 'privacy-policy', url: '/privacy-policy', icon: 'battery-full-outline' },
    { title: 'login', url: '/login', icon: '' },
  ];
  public labels = ['Семья', 'Друзья', 'Заметки', 'Работа', 'Путешествия', 'Напоминания'];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ru');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}




