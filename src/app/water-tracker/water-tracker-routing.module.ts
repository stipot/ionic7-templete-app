import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterTrackerComponent } from './water-tracker.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: WaterTrackerComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'main',
        canActivate: [authGuard],
        loadChildren: () => import('./tabs/main/main.module').then(m => m.MainPageModule),
      },
      {
        path: 'statistics',
        canActivate: [authGuard],
        loadChildren: () => import('./tabs/statistics/statistics.module').then(m => m.StatisticsModule),
      },
      {
        path: 'settings',
        canActivate: [authGuard],
        loadChildren: () => import('./tabs/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () => import('./tabs/profile/profile.module').then(m => m.ProfileModule),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterTrackerRoutingModule {}
