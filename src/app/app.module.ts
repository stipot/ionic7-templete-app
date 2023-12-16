import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgFor } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SettingsComponent} from "./settings/settings.component"

import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NotesComponent } from './notes/notes.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component"
import { SignupComponent } from './signup/signup.component';
import { FashionComponent } from './fashion/fashion.component';

@NgModule({
  declarations: [AppComponent, FormsComponent, NotesComponent, ContactCardComponent, SettingsComponent, PrivacyPolicyComponent, SignupComponent, FashionComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Инициализация базы данных
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    NgFor,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
