import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GazonComponent } from './gazon.component';

const routes: Routes = [
  {
    path: '',
    component: GazonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GazonRoutingModule {}