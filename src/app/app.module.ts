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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { FaceDetectorComponent } from './face-detect/face-detector.component';  // ИСПРАВЛЕНО
import { FashionComponent } from './fashion/fashion.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';
import { FormsComponent } from './forms/forms.component';
import { NotesComponent } from './notes/notes.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { KanbanComponent } from './kanban/kanban.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DealsComponent } from './deals/deals.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { IntroComponent } from './intro/intro.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AppSharedComponentsModule } from './shared/common.module';
import { CryptoRatesComponent } from "./cryptorates/cryptorates.component";
import { VideoPlayerComponent } from './videoplayer/videoplayer.component';
import { FrontLayoutComponent } from "./front-layout/front-layout.component";
import { RecipesComponent } from './recipes/recipes.component';
import { MplayerComponent } from "./mplayer/mplayer.component";
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { MoodCalendarComponent } from './mood-calendar/mood-calendar.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RsaComponent } from './rsa/rsa.component';
import { MapsComponent } from './maps/maps.component';
import { MiniblogComponent } from './miniblog/miniblog.component';
import { AddBlogModalComponent } from './miniblog/add-blog-modal.component';
import { RssDataComponent } from './rss-data/rss-data.component';
import { WidgetModule } from './widget/widget.module';
import { CalcModule } from './calc/calc.module';
import { WaterTrackerComponent } from './water-tracker/water-tracker.component';
import { GazonComponent } from './gazon/gazon.component';

// Фабрика для загрузчика переводов
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FaceDetectorComponent,
    FashionComponent,
    FashionDetailComponent,
    FormsComponent,
    NotesComponent,
    TodoListComponent,
    TodoTaskComponent,
    KanbanComponent,
    ContactCardComponent,
    SettingsComponent,
    UserComponent,
    PrivacyPolicyComponent,
    ForgotPasswordComponent,
    DealsComponent,
    BarcodeScannerComponent,
    IntroComponent,
    TermsOfServiceComponent,
    CryptoRatesComponent,
    VideoPlayerComponent,
    FrontLayoutComponent,
    RecipesComponent,
    MoodCalendarComponent,
    MplayerComponent,
    FileViewerComponent,
    DragAndDropComponent,
    ShoppingListComponent,
    MapsComponent,
    RsaComponent,
    MiniblogComponent,
    AddBlogModalComponent,
    WaterTrackerComponent,
    GazonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppSharedComponentsModule,
    CommonModule,
    WidgetModule,
    CalcModule,
    DragDropModule,
    IonicStorageModule.forRoot(),
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