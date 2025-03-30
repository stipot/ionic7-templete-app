import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

interface FeedItem {
  description: string;
  url: string;
  guid: string;
  isEditing: boolean;
}

interface NewsSource {
  guid: string;
  url: string;
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-rss-data',
  templateUrl: './rss-data.component.html',
  styleUrls: ['./rss-data.component.scss']
})
export class RssDataComponent implements OnInit {
  pageTitle = "Новостная лента!";
  
  // News sources list
  public newsSources: NewsSource[] = [
    {
      guid: 'un-news',
      url: 'https://news.un.org/feed/subscribe/ru/news/topic/law-and-crime-prevention/feed/rss.xml',
      name: 'ООН',
      isActive: true
    },
    {
      guid: 'tass-news',
      url: 'https://tass.ru/rss/v2.xml',
      name: 'ТАСС',
      isActive: true
    },
    {
      guid: 'ria-news',
      url: 'https://ria.ru/export/rss2/archive/index.xml',
      name: 'РИА',
      isActive: true
    },
    {
      guid: 'interfax-news',
      url: 'https://www.interfax.ru/rss.asp',
      name: 'Интерфакс',
      isActive: true
    },
    {
      guid: 'rt-news',
      url: 'https://russian.rt.com/rss',
      name: 'RT',
      isActive: true
    }
  ];
  
  public newsItems: any[] = [];
  public feedItems: FeedItem[] = [];
  public segment = 'news'; // Установите начальный сегмент на "news"
  public editingDescription: string = '';
  public isLoading: boolean = false;
  public sourceLoadingStatus: {[key: string]: boolean} = {};

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.fetchRssFromAllActiveSources();
    this.initFeedItems();
    // Component name
    this.translate.get('News').subscribe((translated: string) => {
      this.pageTitle = translated;
    });
  }

  fetchRssFromAllActiveSources(): void {
    this.isLoading = true;
    this.newsItems = []; // Clear previous news
    
    // Get only active sources
    const activeSources = this.newsSources.filter(source => source.isActive);
    
    // If no active sources, end loading
    if (activeSources.length === 0) {
      this.isLoading = false;
      return;
    }
    
    // Initialize loading status for each source
    this.sourceLoadingStatus = {};
    activeSources.forEach(source => {
      this.sourceLoadingStatus[source.guid] = true;
    });
    
    // Fetch from each active source
    activeSources.forEach(source => {
      this.fetchRssFromSource(source);
    });
  }

  fetchRssFromSource(source: NewsSource): void {
    // Use a proxy for external RSS feeds to avoid CORS issues
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const encodedUrl = encodeURIComponent(source.url);
    const requestUrl = proxyUrl + encodedUrl;
    
    // Set appropriate headers
    const headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    });

    this.http.get(requestUrl, { headers })
      .subscribe({
        next: (response: any) => {
          if (response && response.contents) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.contents, 'application/xml');
            const items = xmlDoc.querySelectorAll('item');

            // Log for debugging
            console.log(`Loaded ${items.length} items from ${source.name}`);

            items.forEach((item) => {
              const title = item.querySelector('title')?.textContent || 'Без заголовка';
              const description = item.querySelector('description')?.textContent || 'Без описания';
              const link = item.querySelector('link')?.textContent || '#';
              const pubDate = item.querySelector('pubDate')?.textContent || '';
              
              // Улучшенный метод получения изображений
              let image = '';
              const enclosure = item.querySelector('enclosure');
              const mediaContent = item.querySelector('media\\:content, content');
              const imageTag = item.querySelector('image');
              
              if (enclosure && enclosure.getAttribute('url')) {
                image = enclosure.getAttribute('url') || '';
              } else if (mediaContent && mediaContent.getAttribute('url')) {
                image = mediaContent.getAttribute('url') || '';
              } else if (imageTag) {
                // Некоторые RSS-ленты используют тег image
                image = imageTag.querySelector('url')?.textContent || '';
              } else {
                // Пытаемся извлечь первое изображение из описания
                const div = document.createElement('div');
                div.innerHTML = description;
                const firstImg = div.querySelector('img');
                image = firstImg ? (firstImg.getAttribute('src') || '') : '';
              }

              // Проверка и нормализация URL изображения
              if (image && !image.startsWith('http')) {
                // Относительные URL
                if (image.startsWith('/')) {
                  try {
                    const sourceUrl = new URL(source.url);
                    image = `${sourceUrl.protocol}//${sourceUrl.hostname}${image}`;
                  } catch {
                    image = '';
                  }
                } else {
                  image = '';
                }
              }
              
              // Заполнитель с брендингом источника
              if (!image) {
                image = `https://via.placeholder.com/300x150?text=${encodeURIComponent(source.name)}`;
              }

              this.newsItems.push({
                title,
                description: this.stripHtml(description),
                link,
                image,
                pubDate,
                source: source.name,
                sourceGuid: source.guid
              });
            });
          } else {
            console.error(`Invalid response format from ${source.name}`);
          }
        },
        error: (error) => {
          console.error(`Error fetching RSS from ${source.name}:`, error);
        },
        complete: () => {
          // Mark source as loaded
          this.sourceLoadingStatus[source.guid] = false;
          
          // Check if all sources have completed loading
          const allLoaded = Object.values(this.sourceLoadingStatus).every(status => status === false);
          if (allLoaded) {
            this.isLoading = false;
            
            // Sort news items by most recent first (if they have dates)
            this.sortNewsByDate();
          }
        }
      });
  }
  
  // Обработка ошибок загрузки изображений
  handleImageError(item: any): void {
    item.image = `https://via.placeholder.com/300x150?text=${encodeURIComponent(item.source || 'News')}`;
  }
  
  // Helper function to strip HTML tags from description
  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  
  // Sort news by date if available
  sortNewsByDate(): void {
    this.newsItems.sort((a, b) => {
      // If we have pubDate in the items, use it for sorting
      if (a.pubDate && b.pubDate) {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      }
      return 0; // Keep original order if no dates
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

  toggleNewsSource(source: NewsSource): void {
    source.isActive = !source.isActive;
    this.fetchRssFromAllActiveSources();
  }

  startEditing(item: FeedItem): void {
    this.editingDescription = item.description;
    item.isEditing = true;
  }

  saveEditing(item: FeedItem): void {
    console.log('Сохранение...');
    item.description = this.editingDescription;
    item.isEditing = false;
    console.log('Новое описание:', item.description);
  }

  cancelEditing(item: FeedItem): void {
    console.log('Отмена...');
    item.isEditing = false;
  }

  // Добавление новой записи
  addNewFeedItem(): void {
    const newItem: FeedItem = {
      description: 'Новая запись',
      url: 'https://example.com/new',
      guid: `guid-${Math.random().toString(36).substring(2, 9)}`,
      isEditing: false
    };
    this.feedItems.unshift(newItem); // Добавляем в начало списка
  }

  // Удаление записи
  deleteFeedItem(item: FeedItem): void {
    this.feedItems = this.feedItems.filter((i) => i.guid !== item.guid);
    console.log('Запись удалена:', item.guid);
  }
}




