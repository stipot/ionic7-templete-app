import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { G2048Component } from './g2048.component';

const routes: Routes = [
  {
    path: '',
    component: G2048Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class G2048RoutingModule {}