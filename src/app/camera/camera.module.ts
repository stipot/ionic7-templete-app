import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CameraPageRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CameraPageRoutingModule
  ],
  declarations: [CameraComponent]
})
export class CameraPageModule {}
