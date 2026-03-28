import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TimerPageRoutingModule } from './timer.routing.module';
import { TimerComponent } from './timer.component';

@NgModule({
  declarations: [TimerComponent],
  imports: [
    CommonModule,
    TimerPageRoutingModule,
    FormsModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // позволяет использовать пользовательские элементы
})
export class TimerModule { }