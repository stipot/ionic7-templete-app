import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GetformsRoutingModule} from './getforms-routing.module'
import { GetformsComponent } from './getforms.component';




@NgModule({
  
  imports: [
    CommonModule,
    GetformsRoutingModule
  ],
  declarations: [GetformsComponent]
})
export class GetformsModule { }
