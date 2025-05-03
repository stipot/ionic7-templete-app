import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
  export class SettingsService {
    private readonly LANGUAGE_KEY = 'app_language';
    private appLanguage = new BehaviorSubject<string>('ru');
  
    constructor(
      private translate: TranslateService,
      private storage: Storage
    ) {
      this.initStorage();
    }
  
    async initStorage() {
      await this.storage.create();
      const storedLang = await this.storage.get(this.LANGUAGE_KEY);
      if (storedLang) {
        this.appLanguage.next(storedLang);
        this.translate.use(storedLang);
      } else {
        // Устанавливаем русский как язык по умолчанию
        this.storage.set(this.LANGUAGE_KEY, 'ru');
        this.translate.setDefaultLang('ru');
        this.translate.use('ru');
      }
    }
  
    get language() {
      return this.appLanguage.asObservable();
    }
  
    get currentLanguage() {
      return this.appLanguage.value;
    }
  
    async changeLanguage(langCode: string) {
      await this.storage.set(this.LANGUAGE_KEY, langCode);
      this.appLanguage.next(langCode);
      this.translate.use(langCode);
    }
  }