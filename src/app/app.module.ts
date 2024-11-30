import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsComponent } from './forms/forms.component';
import { NgFor } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SettingsComponent} from "./settings/settings.component";

import { FileViewerComponent } from './file-viewer/file-viewer.component';

import { environment } from '../environments/environment';
import { NotesComponent } from './notes/notes.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component"
import { SignupComponent } from './signup/signup.component';
import { FashionComponent } from './fashion/fashion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IntroComponent } from './intro/intro.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {BarcodeScannerComponent} from './barcode-scanner/barcode-scanner.component';
import {AppSharedComponentsModule} from './shared/common.module'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RssDataComponent } from './rss-data/rss-data.component';
import {DealsComponent} from './deals/deals.component';
import { TermsOfServiceComponent } from "./terms-of-service/terms-of-service.component"

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18s/', '.json')};
  import {UserComponent} from "./user/user.component";

@NgModule({
  declarations: [AppComponent, FashionComponent, FormsComponent, NotesComponent, TodoListComponent, ContactCardComponent, SettingsComponent, UserComponent, PrivacyPolicyComponent, ForgotPasswordComponent,DealsComponent, BarcodeScannerComponent,  RssDataComponent, IntroComponent, TermsOfServiceComponent, FileViewerComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    AppSharedComponentsModule,
    // Инициализация базы данных
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, TranslateService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

