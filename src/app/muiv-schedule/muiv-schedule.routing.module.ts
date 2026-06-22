import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuivSheduleComponent} from './muiv-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: MuivSheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuivShedulePageRoutingModule {}
