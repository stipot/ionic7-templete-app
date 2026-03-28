import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MorscoyBoiPageRoutingModule } from './morscoy_boi.routing.module';
import { MorscoyBoiComponent } from './morscoy-boi.component';

@NgModule({
  declarations: [MorscoyBoiComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MorscoyBoiPageRoutingModule
  ]
})
export class MorscoyBoiModule { }
