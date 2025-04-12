import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRssPage } from './login-rss.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRssPageRoutingModule {}
