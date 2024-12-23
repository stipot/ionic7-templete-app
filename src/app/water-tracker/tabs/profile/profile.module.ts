import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage]
})
export class ProfileModule {}
