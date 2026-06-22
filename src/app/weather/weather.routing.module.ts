import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherComponent} from './weather.component';
import {TranslateService} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherPageRoutingModule {}
