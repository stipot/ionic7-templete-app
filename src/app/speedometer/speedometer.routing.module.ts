import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeedometerComponent} from './speedometer.component';

const routes: Routes = [
  {
    path: '',
    component: SpeedometerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeedometerPageRoutingModule {}
