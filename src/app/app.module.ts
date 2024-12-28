import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// Компоненты
import { FashionComponent } from './fashion/fashion.component';
import { FormsComponent } from './forms/forms.component';
import { NotesComponent } from './notes/notes.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { KanbanComponent } from './kanban/kanban.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DealsComponent } from './deals/deals.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { RssDataComponent } from './rss-data/rss-data.component';
import { IntroComponent } from './intro/intro.component';
import { CameraComponent } from './camera/camera.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AppSharedComponentsModule } from './shared/common.module';
import{CryptoRatesComponent} from "./cryptorates/cryptorates.component";
import { VideoPlayerComponent } from './videoplayer/videoplayer.component';
import {FrontLayoutComponent} from "./front-layout/front-layout.component";
import { RecipesComponent } from './recipes/recipes.component';
import {MplayerComponent} from "./mplayer/mplayer.component";

import { MoodCalendarComponent } from './mood-calendar/mood-calendar.component';

// Фабрика для загрузчика переводов
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18s/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FashionComponent,
    FormsComponent,
    NotesComponent,
    TodoListComponent,
    KanbanComponent,
    ContactCardComponent,
    SettingsComponent,
    UserComponent,
    PrivacyPolicyComponent,
    ForgotPasswordComponent,
    DealsComponent,
    BarcodeScannerComponent,
    RssDataComponent,
    IntroComponent,
    TermsOfServiceComponent,
    CryptoRatesComponent,
    VideoPlayerComponent,
    FrontLayoutComponent,
    RecipesComponent,
    MoodCalendarComponent,
    MplayerComponent,
    CameraComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Убедитесь, что этот импорт только один
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppSharedComponentsModule,
    // Инициализация базы данных
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
