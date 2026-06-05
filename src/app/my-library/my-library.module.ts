import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyLibraryComponent } from './my-library.component';
import { MyLibraryPageRoutingModule } from './my-library.routing.module';

@NgModule({
  declarations: [MyLibraryComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLibraryPageRoutingModule,
  ]
})
export class MyLibraryModule { }
