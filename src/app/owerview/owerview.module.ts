import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwerviewPageRoutingModule } from './owerview-routing.module';

import { OwerviewPage } from './owerview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwerviewPageRoutingModule
  ],
  declarations: [OwerviewPage]
})
export class OwerviewPageModule {}
