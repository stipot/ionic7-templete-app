import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TierListPageRoutingModule } from './tierList.routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TierListComponent } from './tier-list.component';


@NgModule({
  declarations: [TierListComponent],
  imports: [
    TierListPageRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class TierListModule { }
