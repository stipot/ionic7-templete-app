import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WaterTrackerComponent } from './water-tracker.component';
import { WaterTrackerRoutingModule } from './water-tracker-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WaterTrackerComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    WaterTrackerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WaterTrackerModule {}
