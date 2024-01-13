import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rss-data',
  templateUrl: './rss-data.component.html',
  styleUrls: ['./rss-data.component.css']
})
export class RssDataComponent {

  rssData: any;

  constructor(private http: HttpClient) {
    this.fetchRssData();
  }

  fetchRssData() {
    const rssUrl = 'https://example.com/rss-feed'; // Замените на URL вашего RSS-ленты новостей

    this.http.get(rssUrl, { responseType: 'text' })
      .subscribe((data: any) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        const parsedData = [];

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const title = item.getElementsByTagName('title')[0].textContent;
          const link = item.getElementsByTagName('link')[0].textContent;
          parsedData.push({ title, link });
        }

        this.rssData = parsedData;
      });
  }
}
