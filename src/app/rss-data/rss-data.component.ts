import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../services/settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Убедитесь, что этот импорт присутствует

interface FeedItem {
  description: string;
  url: string;
  guid: string;
  isEditing: boolean;
  originalDescription?: string;
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
  public segment = 'news';
  public editingDescription: string = '';
  public isLoading: boolean = false;
  public sourceLoadingStatus: { [key: string]: boolean } = {};
  public feedForm!: FormGroup; // Используем ! для указания, что переменная будет определена

  languages = [
    { code: 'ru', label: 'RUSSIAN', active: false },
    { code: 'en', label: 'ENGLISH', active: false },
    { code: 'fr', label: 'FRENCH', active: false },
    { code: 'it', label: 'ITALIAN', active: false }
  ];
  currentLang = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private settingsService: SettingsService,
    private fb: FormBuilder // Убедитесь, что FormBuilder внедрен
  ) {
    this.createForm(); // Инициализация формы в конструкторе
  }

  createForm() {
    this.feedForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(64)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.syncLanguageUI();

    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.syncLanguageUI();
      this.updateTranslations();
    });
    
    this.fetchRssFromAllActiveSources();
    this.initFeedItems();
    
    this.translate.get('News').subscribe((translated: string) => {
      this.pageTitle = translated;
    });
  }

  syncLanguageUI(): void {
    this.languages.forEach(lang => {
      lang.active = lang.code === this.currentLang;
    });
  }
  
  updateTranslations(): void {
    this.feedItems.forEach(item => {
      this.translateDescription(item);
    });
    
    this.translate.get('News').subscribe((translated: string) => {
      this.pageTitle = translated;
    });
  }

  fetchRssFromAllActiveSources(): void {
    this.isLoading = true;
    this.newsItems = [];
    
    const activeSources = this.newsSources.filter(source => source.isActive);
    if (activeSources.length === 0) {
      this.isLoading = false;
      return;
    }
    
    this.sourceLoadingStatus = {};
    activeSources.forEach(source => {
      this.sourceLoadingStatus[source.guid] = true;
    });
    
    activeSources.forEach(source => {
      this.fetchRssFromSource(source);
    });
  }

  fetchRssFromSource(source: NewsSource): void {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const encodedUrl = encodeURIComponent(source.url);
    const requestUrl = proxyUrl + encodedUrl;
    
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

            console.log(`Loaded ${items.length} items from ${source.name}`);

            items.forEach((item) => {
              const title = item.querySelector('title')?.textContent || 'Без заголовка';
              const description = item.querySelector('description')?.textContent || 'Без описания';
              const link = item.querySelector('link')?.textContent || '#';
              const pubDate = item.querySelector('pubDate')?.textContent || '';
              
              let image = '';
              const enclosure = item.querySelector('enclosure');
              const mediaContent = item.querySelector('media\\:content, content');
              const imageTag = item.querySelector('image');
              
              if (enclosure && enclosure.getAttribute('url')) {
                image = enclosure.getAttribute('url') || '';
              } else if (mediaContent && mediaContent.getAttribute('url')) {
                image = mediaContent.getAttribute('url') || '';
              } else if (imageTag) {
                image = imageTag.querySelector('url')?.textContent || '';
              } else {
                const div = document.createElement('div');
                div.innerHTML = description;
                const firstImg = div.querySelector('img');
                image = firstImg ? (firstImg.getAttribute('src') || '') : '';
              }

              if (image && !image.startsWith('http')) {
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
          this.sourceLoadingStatus[source.guid] = false;
          const allLoaded = Object.values(this.sourceLoadingStatus).every(status => status === false);
          if (allLoaded) {
            this.isLoading = false;
            this.sortNewsByDate();
          }
        }
      });
  }
  
  handleImageError(item: any): void {
    item.image = `https://via.placeholder.com/300x150?text=${encodeURIComponent(item.source || 'News')}`;
  }
  
  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  
  sortNewsByDate(): void {
    this.newsItems.sort((a, b) => {
      if (a.pubDate && b.pubDate) {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      }
      return 0;
    });
  }

  toggleLanguage(langCode: string): void {
    this.settingsService.changeLanguage(langCode);
  }

  async translateDescription(item: FeedItem): Promise<void> {
    if (!item.originalDescription) {
      item.originalDescription = item.description;
    }
    
    const textToTranslate = item.originalDescription;
    if (this.currentLang === 'ru') {
      item.description = textToTranslate;
    } else {
      item.description = `${textToTranslate} (translated to ${this.currentLang})`;
    }
  }

  initFeedItems(): void {
    this.feedItems = [
      { description: 'Краткое описание новости 1', url: 'https://example.com/news1', guid: 'guid-12345', isEditing: false },
      { description: 'Краткое описание новости 2', url: 'https://example.com/news2', guid: 'guid-67890', isEditing: false },
      { description: 'Краткое описание новости 3', url: 'https://example.com/news3', guid: 'guid-11111', isEditing: false }
    ];
    this.feedItems.forEach(item => {
      item.originalDescription = item.description;
      this.translateDescription(item);
    });
  }

  toggleNewsSource(source: NewsSource): void {
    source.isActive = !source.isActive;
    this.fetchRssFromAllActiveSources();
  }

  startEditing(item: FeedItem): void {
    this.feedForm.patchValue({
      description: item.description,
      url: item.url
    });
    item.isEditing = true;
  }

  saveEditing(item: FeedItem): void {
    if (this.feedForm.valid) {
      console.log('Сохранение...');
      item.description = this.feedForm.get('description')?.value;
      item.url = this.feedForm.get('url')?.value;
      item.originalDescription = this.currentLang === 'ru' ? item.description : item.originalDescription;
      item.isEditing = false;
      this.translateDescription(item);
      console.log('Новое описание:', item.description);
    }
  }

  cancelEditing(item: FeedItem): void {
    console.log('Отмена...');
    item.isEditing = false;
    this.feedForm.reset();
  }

  addNewFeedItem(): void {
    const newItem: FeedItem = {
      description: 'Новая запись',
      url: 'https://example.com/new',
      guid: `guid-${Math.random().toString(36).substring(2, 9)}`,
      isEditing: true,
      originalDescription: 'Новая запись'
    };
    this.feedItems.unshift(newItem);
    this.startEditing(newItem);
  }

  deleteFeedItem(item: FeedItem): void {
    this.feedItems = this.feedItems.filter((i) => i.guid !== item.guid);
    console.log('Запись удалена:', item.guid);
  }
}




