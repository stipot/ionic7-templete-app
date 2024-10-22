import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'

import {AppHeaderComponent} from './app-header/app-header.component';

@NgModule({
  declarations: [AppHeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AppHeaderComponent]
})
export class AppSharedComponentsModule { }