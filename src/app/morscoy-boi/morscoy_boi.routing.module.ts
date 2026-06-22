import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorscoyBoiComponent} from './morscoy-boi.component';

const routes: Routes = [
  {
    path: '',
    component: MorscoyBoiComponent
  }
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorscoyBoiPageRoutingModule {}
