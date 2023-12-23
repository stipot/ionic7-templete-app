import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './signup.routing.module';

import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignUpPageRoutingModule
  ],
  declarations: [SignupComponent]
})
export class SignUpPageModule {}
