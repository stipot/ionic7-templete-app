import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwerviewPage } from './owerview.page';

const routes: Routes = [
  {
    path: '',
    component: OwerviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwerviewPageRoutingModule {}
