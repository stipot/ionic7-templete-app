import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredictingHousePricesRoutingModule } from './predicting-house-prices-routing.module';
import { PredictingHousePricesComponent } from './predicting-house-prices.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'; 


@NgModule({
  declarations: [PredictingHousePricesComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    PredictingHousePricesRoutingModule,
    TranslateModule
  ]
})
export class PredictingHousePricesModule { }
