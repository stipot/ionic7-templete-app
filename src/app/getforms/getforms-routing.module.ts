import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetformsComponent } from './getforms.component';

const routes: Routes = [
  {
    path: '',
    component: GetformsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetformsRoutingModule {}