import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaimerComponent} from './taimer.component';

const routes: Routes = [
  {
    path: '',
    component: TaimerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaimerPageRoutingModule {}
