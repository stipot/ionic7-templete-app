// rss-data.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../services/settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from './guid';
import { FirestoreService } from '../user/firestore.service';

interface FeedItem {
  description: string;
  url: string;
  guid: string;
  isEditing: boolean;
  originalDescription?: string;
  sourceGuid?: string;
}

interface NewsSource {
  guid: string;
  url: string;
  name: string;
  isActive: boolean;
}

interface NewsItem {
  title: string;
  description: string;
  link: string;
  image: string;
  pubDate: string;
  source: string;
  sourceGuid: string;
  guid: string; // Добавляем GUID для новости
  favicon?: string;
}

@Component({
  selector: 'app-rss-data',
  templateUrl: './rss-data.component.html',
  styleUrls: ['./rss-data.component.scss']
})
export class RssDataComponent implements OnInit {
  pageTitle = "Новостная лента!";
  selectedSource: string = 'rt-news';
  previewMode: boolean = false;
  selectedNewsUrl: SafeResourceUrl | null = null;
  
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
  
  public newsItems: NewsItem[] = [];
  public feedItems: FeedItem[] = [];
  public segment = 'news';
  public isLoading: boolean = false;
  public sourceLoadingStatus: { [key: string]: boolean } = {};
  public feedForm!: FormGroup;
  public favorites: string[] = []; // Список GUID избранных новостей

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
    private fb: FormBuilder,
    private firestore: FirestoreService,
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
    this.loadFavorites(); // Загружаем фавориты при инициализации

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

  
  // Загрузка фаворитов из localStorage
  loadFavorites(): void {
    const savedFavorites = localStorage.getItem('favorites');
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  }

  // Сохранение фаворитов в localStorage и Firestore
  async saveFavorites(): Promise<void> { // Убираем userId из аргументов
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    // Сохраняем в Firestore по пути particles -> userId -> 'favorites'
    await this.firestore.storeComponentData('favorites', this.favorites);
  }

  // Проверка, находится ли новость в избранном
  isFavorite(newsGuid: string): boolean {
    return this.favorites.includes(newsGuid);
  }

    // Переключение статуса избранного
  async toggleFavorite(news: NewsItem): Promise<void> { // Убираем userId из аргументов
    if (this.isFavorite(news.guid)) {
      this.favorites = this.favorites.filter(guid => guid !== news.guid);
    } else {
      this.favorites.push(news.guid);
    }
    await this.saveFavorites();
  }

    // Загрузка фаворитов из Firestore при инициализации
  async loadFavoritesFromFirestore(): Promise<void> { // Убираем userId из аргументов
    const favoritesFromDB = await this.firestore.getComponentData('favorites');
    if (favoritesFromDB && Array.isArray(favoritesFromDB)) {
      this.favorites = favoritesFromDB;
      this.saveFavorites(); // Обновляем localStorage
    } else {
      this.loadFavorites(); // fallback на localStorage
    }
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
      this.selectedSource === 'all' || source.guid === this.selectedSource
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
        this.fetchFavicons();
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
                const newsItem: NewsItem = {
                  title: item.querySelector('title')?.textContent || 'Без заголовка',
                  description: this.stripHtml(item.querySelector('description')?.textContent || 'Без описания'),
                  link: item.querySelector('link')?.textContent || '#',
                  image: this.getImageFromItem(item, source),
                  pubDate: item.querySelector('pubDate')?.textContent || '',
                  source: source.name,
                  sourceGuid: source.guid,
                  guid: Guid.newGuid(), // Генерируем уникальный GUID для новости
                  favicon: ''
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

  fetchFavicons(): void {
    this.newsItems.forEach(item => {
      const source = this.newsSources.find(s => s.guid === item.sourceGuid);
      if (source) {
        const url = new URL(source.url);
        const domain = url.hostname;
        const faviconUrl = `https://${domain}/favicon.ico`;

        this.http.head(faviconUrl, { observe: 'response' })
          .subscribe({
            next: () => {
              item.favicon = faviconUrl;
            },
            error: () => {
              item.favicon = `https://via.placeholder.com/16x16?text=${encodeURIComponent(item.source || 'News')}`;
            }
          });
      }
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

  togglePreviewMode(event: any): void {
    this.previewMode = event.detail.checked;
    if (!this.previewMode) {
      this.selectedNewsUrl = null;
    }
  }

  openNews(item: any): void {
    if (this.previewMode) {
      this.selectedNewsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.link);
    }
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
      { description: 'Краткое описание новости 1', url: 'https://example.com/news1', guid: Guid.newGuid(), isEditing: false, sourceGuid: 'un-news' },
      { description: 'Краткое описание новости 2', url: 'https://example.com/news2', guid: Guid.newGuid(), isEditing: false, sourceGuid: 'tass-news' },
      { description: 'Краткое описание новости 3', url: 'https://example.com/news3', guid: Guid.newGuid(), isEditing: false, sourceGuid: 'ria-news' }
    ];
    this.feedItems.forEach(item => {
      item.originalDescription = item.description;
      this.translateDescription(item);
    });
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
      originalDescription: 'Новая запись',
      sourceGuid: 'un-news'
    };
    this.feedItems.unshift(newItem);
    this.startEditing(newItem);
  }

  deleteFeedItem(item: FeedItem): void {
    this.feedItems = this.feedItems.filter((i) => i.guid !== item.guid);
  }

  checkFeedItem(item: FeedItem): void {
    if (item.sourceGuid) {
      this.selectedSource = item.sourceGuid;
      this.segment = 'news';
      this.fetchRssFromAllActiveSources();
    }
  }

  // Экспорт лент в OPML
  exportToOPML(): void {
    const opml = this.generateOPML();
    const blob = new Blob([opml], { type: 'text/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feeds.opml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Генерация OPML-файла
  private generateOPML(): string {
    const dateCreated = new Date().toISOString();
    let opml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    opml += `<opml version="1.0">\n`;
    opml += `  <head>\n`;
    opml += `    <title>Feeder - RSS Feed Reader</title>\n`;
    opml += `    <dateCreated>${dateCreated}</dateCreated>\n`;
    opml += `  </head>\n`;
    opml += `  <body>\n`;

    this.feedItems.forEach(item => {
      const domain = new URL(item.url).hostname;
      const faviconUrl = `https://icons.feedercdn.com/${domain}`;
      opml += `    <ion-icon name="${this.isFavorite(item.guid) ? 'star' : 'star-outline'}" (click)="toggleFavorite(item)"></ion-icon>\n`;
    });

    opml += `  </body>\n`;
    opml += `</opml>`;
    return opml;
  }

  // Импорт лент из OPML
  importFromOPML(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      this.parseOPML(text);
    };
    reader.readAsText(file);
  }

  // Парсинг OPML-файла
  private parseOPML(opmlText: string): void {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(opmlText, 'application/xml');
    const outlines = xmlDoc.querySelectorAll('outline');

    const newFeedItems: FeedItem[] = [];
    outlines.forEach(outline => {
      const description = outline.getAttribute('text') || 'Без описания';
      const url = outline.getAttribute('xmlUrl') || '';
      if (url) {
        const newItem: FeedItem = {
          description,
          url,
          guid: Guid.newGuid(),
          isEditing: false,
          originalDescription: description,
          sourceGuid: this.generateSourceGuid(description)
        };
        newFeedItems.push(newItem);
      }
    });

    this.feedItems = [...newFeedItems, ...this.feedItems];
    this.feedItems.forEach(item => {
      this.translateDescription(item);
    });
  }

  private generateSourceGuid(description: string): string {
    return description.toLowerCase().replace(/\s+/g, '-') + '-' + new Date().getTime();
  }
}



