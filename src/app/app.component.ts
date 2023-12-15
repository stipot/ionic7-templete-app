import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  public appPages = [
    { title: '1', url: '/folder/inbox', icon: 'входящие' },
    { title: '2', url: '/folder/outbox', icon: 'исходящие' },
    { title: '3', url: '/folder/favorites', icon: 'понравившиеся' },
    { title: '4', url: '/folder/archived', icon: 'архив' },
    { title: '5', url: '/folder/trash', icon: 'корзина' },
    { title: '6', url: '/folder/spam', icon: 'предупреждения/спам' },
    // Добавляем поле для перехода на страницу пометок
    { title: '7', url: '/notes', icon: 'Пометки' },
    { title: '8', url:'/filters',icon: 'reader-outline'},
    { title: '9', url: '/validations', icon: '' },  
    { title: '10', url: '/privacy-policy', icon: 'battery-full-outline' },
    { title: '11', url: '/login', icon: '' },
  ];
  public labels = ['Семья', 'Друзья', 'Заметки', 'Работа', 'Путешествия', 'Напоминания'];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ru');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}




