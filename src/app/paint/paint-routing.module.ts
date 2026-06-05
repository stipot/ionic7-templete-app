import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaintComponent } from './paint.component';

const routes: Routes = [
  {
    path: '',
    component: PaintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaintRoutingModule {}