import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WardrobeRoutingModule } from './wardrobe-routing.module';
import { WardrobeComponent } from './wardrobe.component';
import { AddWardrobeItemModalComponent } from './add-wardrobe-item-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WardrobeComponent,
    AddWardrobeItemModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    WardrobeRoutingModule,
    TranslateModule
  ]
})
export class WardrobeModule { }
