import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PaintComponent} from './paint.component'
import {PaintRoutingModule} from './paint-routing.module'

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PaintComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaintRoutingModule
  ]
  
})
export class PaintModule { }
