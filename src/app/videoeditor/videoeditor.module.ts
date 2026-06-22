import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoeditorComponent} from './videoeditor.component'
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VideoeditorRoutingModule } from "./videoeditor.routing.module";
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [VideoeditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    VideoeditorRoutingModule,
    TranslateModule
  ]
})
export class VideoeditorModule { }
