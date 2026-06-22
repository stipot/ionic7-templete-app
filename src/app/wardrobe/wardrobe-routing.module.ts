import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WardrobeComponent } from './wardrobe.component';

const routes: Routes = [
  {
    path: '',
    component: WardrobeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WardrobeRoutingModule {}