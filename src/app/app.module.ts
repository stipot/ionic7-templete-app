import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsComponent} from './forms/forms.component'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { SettingsComponent} from "./settings/settings.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component"

@NgModule({
  declarations: [AppComponent,FormsComponent, ContactCardComponent, SettingsComponent, PrivacyPolicyComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
