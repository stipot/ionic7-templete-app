import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-rss-data',
  templateUrl: './rss-data.component.html',
  styleUrls: ['./rss-data.component.scss']
})
export class RssDataComponent implements OnInit {

  rssData: any;

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.fetchRssData()
  }

  fetchRssData() {
    const rssUrl = 'https://news.un.org/feed/subscribe/ru/news/topic/law-and-crime-prevention/feed/rss.xml'; // Замените на URL вашего RSS-ленты новостей

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
        // console.log("Данные",parsedData)
      });
  }
}
