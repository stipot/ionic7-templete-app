import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationsPage } from './validations.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationsPageRoutingModule {}
