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
  filtered_articles: Article[] = []; 
  searchText: string = ""; 
  Result: string = "";

  constructor(private http: HttpClient, private data: DataService) {}

  ngOnInit() {
    this.data.getData().subscribe((response: any) => {
      this.articles_cards = response;
      this.filtered_articles = response; 
      console.log(this.articles_cards);
    });
  }

search_btn() {
  const inputElement = document.querySelector('ion-input') as HTMLIonInputElement;

 
  if (inputElement && inputElement.value !== null && inputElement.value !== undefined) {
  
    this.searchText = String(inputElement.value).toLowerCase();

 
    this.filtered_articles = this.articles_cards.filter(article =>
      (article.a_name as string).toLowerCase().includes(this.searchText)
    );

   
    this.Result = `Вы искали: "${this.searchText}"`;
  } else {
  
    this.searchText = '';
    this.filtered_articles = this.articles_cards; 
    this.Result = 'Введите текст для поиска';
  }
}

  
}
