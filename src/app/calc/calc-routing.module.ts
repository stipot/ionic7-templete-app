import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalcComponent } from './calc.component';

const routes: Routes = [
  {
    path: '',
    component: CalcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalcRoutingModule {}
