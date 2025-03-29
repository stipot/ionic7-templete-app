import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

interface FeedItem {
  description: string;
  url: string;
  guid: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-rss-data',
  templateUrl: './rss-data.component.html',
  styleUrls: ['./rss-data.component.scss']
})
export class RssDataComponent implements OnInit {
  pageTitle = "Новостная лента!"
  private rssUrl = 'https://news.un.org/feed/subscribe/ru/news/topic/law-and-crime-prevention/feed/rss.xml';
  public newsItems: any[] = [];
  public feedItems: FeedItem[] = [];
  public segment = 'news'; // Установите начальный сегмент на "news"
  public editingDescription: string = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,  private translate: TranslateService) {}

  ngOnInit(): void {
    this.fetchRss();
    this.initFeedItems(); // Инициализация элементов ленты
    // Component name
    this.translate.get('News').subscribe((translated: string) => {
      this.pageTitle = translated;
    });
  }

  fetchRss(): void {
    this.http.get(this.rssUrl, { responseType: 'text' }).subscribe((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'application/xml');
      const items = xmlDoc.querySelectorAll('item');

      items.forEach((item) => {
        const title = item.querySelector('title')?.textContent || 'Без заголовка';
        const description = item.querySelector('description')?.textContent || 'Без описания';
        const link = item.querySelector('link')?.textContent || '#';
        const image = item.querySelector('enclosure')?.getAttribute('url') || 'https://via.placeholder.com/300x150';

        this.newsItems.push({
          title,
          description: description,
          link,
          image
        });
      });
    });
  }

  initFeedItems(): void {
    // Примерные данные для ленты
    this.feedItems = [
      {
        description: 'Краткое описание новости 1',
        url: 'https://example.com/news1',
        guid: 'guid-12345',
        isEditing: false
      },
      {
        description: 'Краткое описание новости 2',
        url: 'https://example.com/news2',
        guid: 'guid-67890',
        isEditing: false
      },
      {
        description: 'Краткое описание новости 3',
        url: 'https://example.com/news3',
        guid: 'guid-11111',
        isEditing: false
      }
    ];
  }

  startEditing(item: FeedItem): void {
    this.editingDescription = item.description;
    item.isEditing = true;
  }

  saveEditing(item: FeedItem): void {
    item.description = this.editingDescription;
    item.isEditing = false;
  }

  cancelEditing(item: FeedItem): void {
    item.isEditing = false;
  }
}


