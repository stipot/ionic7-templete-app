import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GetformsRoutingModule } from './getforms-routing.module';
import { GetformsComponent } from './getforms.component';
import { SurveyModalComponent } from './survey-modal.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetformsRoutingModule
  ],
  declarations: [GetformsComponent, SurveyModalComponent]
})
export class GetformsModule { }
