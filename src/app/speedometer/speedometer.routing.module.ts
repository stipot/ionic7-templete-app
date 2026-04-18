import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeedometerComponent} from './speedometer.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: SpeedometerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class SpeedometerPageRoutingModule {}
