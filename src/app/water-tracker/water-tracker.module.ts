import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WaterTrackerComponent } from './water-tracker.component';
import { WaterTrackerRoutingModule } from './water-tracker-routing.module';

@NgModule({
  declarations: [WaterTrackerComponent],
  imports: [
    CommonModule,
    IonicModule,
    WaterTrackerRoutingModule
  ]
})
export class WaterTrackerModule {}
