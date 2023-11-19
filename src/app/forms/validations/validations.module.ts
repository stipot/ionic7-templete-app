import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ValidationsPageRoutingModule } from './validations-routing.module';

import { ValidationsPage } from './validations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ValidationsPageRoutingModule
  ],
  declarations: [ValidationsPage]
})
export class ValidationsPageModule {}
