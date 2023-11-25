import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageNotFoundPageRoutingModule } from './page-not-found-routing.module';

import { PageNotFoundPage } from './page-not-found.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageNotFoundPageRoutingModule
  ],
  declarations: [PageNotFoundPage]
})
export class PageNotFoundPageModule {}
