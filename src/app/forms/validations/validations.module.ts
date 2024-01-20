// validations.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core'; // Import the TranslateModule

import { ValidationsPageRoutingModule } from './validations-routing.module';

import { ValidationsPage } from './validations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ValidationsPageRoutingModule,
    TranslateModule, // Add the TranslateModule here
  ],
  declarations: [ValidationsPage],
})
export class ValidationsPageModule {}
