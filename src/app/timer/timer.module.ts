import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'; 
import { TimerPageRoutingModule } from './timer.routing.module';
import { TimerComponent } from './timer.component';

@NgModule({
  declarations: [TimerComponent],
  imports: [
    CommonModule,
    TimerPageRoutingModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild() 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimerModule { }
