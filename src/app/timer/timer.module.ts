import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerPageRoutingModule } from './timer.routing.module';
import { TimerComponent } from './timer.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TimerComponent],
  imports: [
    CommonModule,
    TimerPageRoutingModule,
    FormsModule,
    IonicModule
  ]
})
export class TaimerModule { }
