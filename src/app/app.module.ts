import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsComponent } from './forms/forms.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { SettingsComponent } from './settings/settings.component';


// Фабрика для создания TranslateLoader с использованием HttpClient
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18s/', '.json');
}

@NgModule({
  declarations: [AppComponent, FormsComponent, ContactCardComponent, SettingsComponent,],
  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(), // Важно для доступности Ionic компонентов
    AppRoutingModule,
    HttpClientModule,
    
    TranslateModule.forRoot({ // Настройка ngx-translate
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Другие сервисы и провайдеры
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}