import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RssDataComponent } from './rss-data.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Добавлено
import { TranslateModule } from '@ngx-translate/core'; // Добавлено
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: RssDataComponent
  }
];

@NgModule({
  declarations: [RssDataComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RssDataModule { }
