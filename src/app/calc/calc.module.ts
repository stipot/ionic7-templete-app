import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcComponent } from './calc.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CalcComponent],
  imports: [
    CommonModule,
    IonicModule    
  ]
})
export class CalcModule { }
