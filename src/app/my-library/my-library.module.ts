import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLibraryComponent } from './my-library.component';
import { MyLibraryPageRoutingModule } from './my-library.routing.module';

@NgModule({
  declarations: [MyLibraryComponent],
  imports: [
    CommonModule,
    MyLibraryPageRoutingModule
  ]
})
export class MyLibraryModule { }
