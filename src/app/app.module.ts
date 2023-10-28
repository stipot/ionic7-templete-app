import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsComponent} from './forms/forms.component'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {SettingsComponent} from "./settings/settings.component"

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactCardComponent } from './contact-card/contact-card.component';

@NgModule({
  declarations: [AppComponent,FormsComponent, ContactCardComponent, SettingsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
