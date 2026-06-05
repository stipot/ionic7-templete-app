import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictingHousePricesComponent } from './predicting-house-prices.component';

const routes: Routes = [
  {
    path: '',
    component: PredictingHousePricesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredictingHousePricesRoutingModule {}