import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './camera.component';

const routes: Routes = [
  {
    path: 'camera',
    component: CameraComponent,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tabs/tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tabs/tab2/tab2.module').then(m => m.Tab2PageModule)
      },
     
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'camera/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CameraPageRoutingModule {}
