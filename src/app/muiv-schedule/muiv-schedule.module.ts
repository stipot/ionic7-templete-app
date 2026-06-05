import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MuivShedulePageRoutingModule } from './muiv-schedule.routing.module';
import { MuivSheduleComponent  } from './muiv-schedule.component';

@NgModule({
  declarations: [MuivSheduleComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MuivShedulePageRoutingModule
  ]
})
export class MuivSheduleModule { }
