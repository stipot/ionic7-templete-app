// mood-calendar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MoodCalendarComponent } from './mood-calendar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MoodCalendarComponent
      }
    ])
  ],
  declarations: [MoodCalendarComponent]
})
export class MoodCalendarPageModule {}