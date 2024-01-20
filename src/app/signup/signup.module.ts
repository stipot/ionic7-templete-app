import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './signup.routing.module';
import { SignupComponent } from './signup.component';
import {AppSharedComponentsModule} from '../shared/common.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignUpPageRoutingModule,
    AppSharedComponentsModule
  ],
  declarations: [SignupComponent]
})
export class SignUpPageModule {}
