// rss-data.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../services/settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from './guid';

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
  selectedSource: string = 'all'; // По умолчанию "Все источники"
  
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
  public isLoading: boolean = false;
  public sourceLoadingStatus: { [key: string]: boolean } = {};
  public feedForm!: FormGroup;

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
    private fb: FormBuilder
  ) {
    this.createForm();
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
    
    const activeSources = this.newsSources.filter(source => 
      source.isActive && (this.selectedSource === 'all' || source.guid === this.selectedSource)
    );
    
    if (activeSources.length === 0) {
      this.isLoading = false;
      return;
    }
    
    this.sourceLoadingStatus = {};
    const fetchPromises = activeSources.map(source => {
      this.sourceLoadingStatus[source.guid] = true;
      return this.fetchRssFromSource(source);
    });

    Promise.all(fetchPromises.map(p => p.catch(e => e)))
      .then(() => {
        this.isLoading = false;
        this.sortNewsByDate();
      });
  }

  fetchRssFromSource(source: NewsSource): Promise<void> {
    return new Promise((resolve) => {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const requestUrl = proxyUrl + encodeURIComponent(source.url);
      
      const headers = new HttpHeaders({
        'Accept': 'application/xml, text/xml',
        'Content-Type': 'application/xml'
      });

      console.log(`Начинаем загрузку ${source.name} с ${source.url}`);

      this.http.get(requestUrl, { headers, responseType: 'text' })
        .subscribe({
          next: (response: string) => {
            try {
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(response, 'application/xml');
              const items = xmlDoc.querySelectorAll('item');
              
              items.forEach((item) => {
                const newsItem = {
                  title: item.querySelector('title')?.textContent || 'Без заголовка',
                  description: this.stripHtml(item.querySelector('description')?.textContent || 'Без описания'),
                  link: item.querySelector('link')?.textContent || '#',
                  image: this.getImageFromItem(item, source),
                  pubDate: item.querySelector('pubDate')?.textContent || '',
                  source: source.name,
                  sourceGuid: source.guid
                };
                
                if (!this.newsItems.some(existing => existing.link === newsItem.link)) {
                  this.newsItems.push(newsItem);
                }
              });
            } catch (error) {
              console.error(`Ошибка парсинга XML от ${source.name}:`, error);
            }
          },
          error: (error) => {
            console.error(`Ошибка загрузки ${source.name}:`, {
              status: error.status,
              message: error.message,
              url: source.url
            });
          },
          complete: () => {
            this.sourceLoadingStatus[source.guid] = false;
            resolve();
          }
        });
    });
  }

  private getImageFromItem(item: Element, source: NewsSource): string {
    let image = '';
    const enclosure = item.querySelector('enclosure');
    const mediaContent = item.querySelector('media\\:content, content');
    
    if (enclosure?.getAttribute('url')) {
      image = enclosure.getAttribute('url') || '';
    } else if (mediaContent?.getAttribute('url')) {
      image = mediaContent.getAttribute('url') || '';
    }
    
    return image || `https://via.placeholder.com/300x150?text=${encodeURIComponent(source.name)}`;
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

  onSourceFilterChange(event: any): void {
    this.selectedSource = event.detail.value;
    this.fetchRssFromAllActiveSources();
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
      { description: 'Краткое описание новости 1', url: 'https://example.com/news1', guid: Guid.newGuid(), isEditing: false },
      { description: 'Краткое описание новости 2', url: 'https://example.com/news2', guid: Guid.newGuid(), isEditing: false },
      { description: 'Краткое описание новости 3', url: 'https://example.com/news3', guid: Guid.newGuid(), isEditing: false }
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
      item.description = this.feedForm.get('description')?.value;
      item.url = this.feedForm.get('url')?.value;
      item.originalDescription = this.currentLang === 'ru' ? item.description : item.originalDescription;
      item.isEditing = false;
      this.translateDescription(item);
    }
  }

  cancelEditing(item: FeedItem): void {
    item.isEditing = false;
    this.feedForm.reset();
  }

  addNewFeedItem(): void {
    const newItem: FeedItem = {
      description: 'Новая запись',
      url: 'https://example.com/new',
      guid: Guid.newGuid(),
      isEditing: true,
      originalDescription: 'Новая запись'
    };
    this.feedItems.unshift(newItem);
    this.startEditing(newItem);
  }

  deleteFeedItem(item: FeedItem): void {
    this.feedItems = this.feedItems.filter((i) => i.guid !== item.guid);
  }
}



