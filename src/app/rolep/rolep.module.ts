import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RolepPageRoutingModule } from './rolep-routing.module';
import { RolepPage } from './rolep.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolepPageRoutingModule
  ],
  declarations: [RolepPage],
  exports: [RolepPage]
})
export class RolepModule { }