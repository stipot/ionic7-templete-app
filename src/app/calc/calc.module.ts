import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcComponent } from './calc.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalcRoutingModule } from './calc-routing.module';

@NgModule({
  declarations: [CalcComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CalcRoutingModule
  ]
})
export class CalcModule { }
