import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolepPage } from './rolep.component';

const routes: Routes = [
  {
    path: '',
    component: RolepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolepPageRoutingModule { }