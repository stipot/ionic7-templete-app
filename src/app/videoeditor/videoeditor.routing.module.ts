import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoeditorComponent } from './videoeditor.component';

const routes: Routes = [
  {
    path: '',
    component: VideoeditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoeditorRoutingModule {}
