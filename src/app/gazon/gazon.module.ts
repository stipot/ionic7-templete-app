import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GazonRoutingModule } from './gazon-routing.module';
import { GazonComponent } from './gazon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GazonRoutingModule
  ],
  declarations: [GazonComponent]
})
export class GazonModule {}