import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DataService } from "./data.service";
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

interface Article {
  doi: string;
  a_name: string;
  a_authors: string;
  abstract: string;
  img_name: string;
}

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-scilink',
  templateUrl: './scilink.component.html',
  styleUrls: ['./scilink.component.scss'],
})
export class ScilinkComponent implements OnInit {
  articles_cards: Article[] = [];
  filtered_articles: Article[] = []; 
  searchText: string = ""; 
  Result: string = "";

  constructor(private http: HttpClient, private data: DataService, private translate: TranslateService) {}

  ngOnInit() {
    this.data.getData().subscribe((response: any) => {
      this.articles_cards = response;
      this.filtered_articles = response; 
      console.log(this.articles_cards);
    }); 
  }

  search_btn() {
    if (this.searchText) {
      this.filtered_articles = this.articles_cards.filter(article =>
        (article.a_name as string).toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.Result = `Вы искали: "${this.searchText}"`;
    } else {
      this.searchText = '';
      this.filtered_articles = this.articles_cards; 
      this.Result = 'Введите текст для поиска';
    }
  }
}
