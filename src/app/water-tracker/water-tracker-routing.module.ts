import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterTrackerComponent } from './water-tracker.component';

const routes: Routes = [
  {
    path: '',
    component: WaterTrackerComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./tabs/main/main.module').then(m => m.MainPageModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('./tabs/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./tabs/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./tabs/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterTrackerRoutingModule {}
