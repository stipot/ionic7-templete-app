import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoPlayerComponent } from './videoplayer.component';

const routes: Routes = [
  {
    path: '',
    component: VideoPlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwerviewPageRoutingModule {}