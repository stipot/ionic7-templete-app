import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClothingShopPage } from './clothing-shop.page';

const routes: Routes = [
  {
    path: '',
    component: ClothingShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClothingShopPageRoutingModule {}