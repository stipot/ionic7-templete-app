import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DataService } from "./data.service";

interface Article {
  doi: string;
  a_name: string;
  a_authors: string;
  abstract: string;
  img_name: string;
}

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-scilink',
  templateUrl: './scilink.component.html',
  styleUrls: ['./scilink.component.scss'],
})
export class ScilinkComponent implements OnInit {
  articles_cards: Article[] = [];
  filtered_articles: Article[] = []; // Новый массив для хранения отфильтрованных статей
  searchText: string = ""; // Поле для ввода текста
  Result: string = ""; // Для отображения результата поиска

  constructor(private http: HttpClient, private data: DataService) {}

  ngOnInit() {
    this.data.getData().subscribe((response: any) => {
      this.articles_cards = response;
      this.filtered_articles = response; // Изначально показываем все статьи
      console.log(this.articles_cards);
    });
  }

search_btn() {
  // Получаем элемент ввода
  const inputElement = document.querySelector('ion-input') as HTMLIonInputElement;

  // Проверяем, что элемент существует и его значение не null или undefined
  if (inputElement && inputElement.value !== null && inputElement.value !== undefined) {
    // Приводим значение к строке и к нижнему регистру
    this.searchText = String(inputElement.value).toLowerCase();

    // Фильтруем статьи по названию
    this.filtered_articles = this.articles_cards.filter(article =>
      (article.a_name as string).toLowerCase().includes(this.searchText)
    );

    // Устанавливаем результат
    this.Result = `Вы искали: "${this.searchText}"`;
  } else {
    // Обработка случая, когда элемент ввода не найден или его значение пустое
    this.searchText = '';
    this.filtered_articles = this.articles_cards; // Или другое значение по умолчанию
    this.Result = 'Введите текст для поиска';
  }
}

  
}
