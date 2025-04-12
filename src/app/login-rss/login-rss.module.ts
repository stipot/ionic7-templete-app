import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRssPageRoutingModule } from './login-rss-routing.module';

import { LoginRssPage } from './login-rss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRssPageRoutingModule
  ],
  declarations: [LoginRssPage]
})
export class LoginRssPageModule {}
