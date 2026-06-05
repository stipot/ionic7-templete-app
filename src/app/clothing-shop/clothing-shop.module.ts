import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClothingShopPageRoutingModule } from './clothing-shop-routing.module';
import { ClothingShopPage } from './clothing-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClothingShopPageRoutingModule
  ],
  declarations: [ClothingShopPage]
})
export class ClothingShopPageModule {}