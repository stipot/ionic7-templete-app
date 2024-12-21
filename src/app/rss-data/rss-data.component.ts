import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-rss-data',
  templateUrl: './rss-data.component.html',
  styleUrls: ['./rss-data.component.scss']
})
export class RssDataComponent implements OnInit {
  private rssUrl = 'https://news.un.org/feed/subscribe/ru/news/topic/law-and-crime-prevention/feed/rss.xml';
  public newsItems: any[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchRss();
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
        console.log(description)

        this.newsItems.push({
          title,
          description: description,
          link,
          image
        });
      });

      this.renderNews();
    });
  }

  renderNews(): void {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
      this.newsItems.forEach((item) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="content">
            <h2>${item.title}</h2>
            <p>${item.description.substring(0, 100)}...</p>
            <a href="${item.link}" target="_blank">Подробнее</a>
          </div>
        `;
        newsContainer.appendChild(newsCard);
      });
    }
  }
}