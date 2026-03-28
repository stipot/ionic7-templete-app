import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeedometerPageRoutingModule } from './speedometer.routing.module';
import { SpeedometerComponent } from './speedometer.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SpeedometerComponent],
  imports: [
    CommonModule,
    SpeedometerPageRoutingModule,
    FormsModule,
    IonicModule
  ]
})
export class SpeedometerModule { }
