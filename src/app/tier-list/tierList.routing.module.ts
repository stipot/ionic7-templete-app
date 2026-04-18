import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TierListComponent} from './tier-list.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: TierListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class TierListPageRoutingModule {}
