import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLibraryComponent} from './my-library.component';

const routes: Routes = [
  {
    path: '',
    component: MyLibraryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLibraryPageRoutingModule {}
