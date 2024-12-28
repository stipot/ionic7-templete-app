import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component'
import { NotesComponent } from './notes/notes.component'
import { ContactCardComponent } from './contact-card/contact-card.component';
import { SettingsComponent } from "./settings/settings.component"
import { TodoListComponent } from './todo-list/todo-list.component';
import {LoginPageModule } from "./login/login.module"
import { FashionComponent } from './fashion/fashion.component';
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { SignupComponent } from './signup/signup.component';
import { IntroComponent } from './intro/intro.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RssDataComponent } from './rss-data/rss-data.component';
import {BarcodeScannerComponent} from './barcode-scanner/barcode-scanner.component';
import { TermsOfServiceComponent } from "./terms-of-service/terms-of-service.component"
import {FrontLayoutComponent} from "./front-layout/front-layout.component"
import {CameraComponent} from './camera/camera.component';

import { VideoPlayerComponent } from './videoplayer/videoplayer.component';


import {DealsComponent} from './deals/deals.component';
import {MoodCalendarComponent} from './mood-calendar/mood-calendar.component';

import { Component } from '@angular/core';
import {UserComponent} from "./user/user.component";
import {ScilinkComponent} from "./scilink/scilink.component";

import { CryptoRatesComponent } from './cryptorates/cryptorates.component'; 
import {MplayerComponent} from "./mplayer/mplayer.component";
import { KanbanComponent } from './kanban/kanban.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component'
import { WaterTrackerComponent } from './water-tracker/water-tracker.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'front-layout',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {    path: 'file-viewer',
    component: FileViewerComponent
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundPageModule)

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'mood-calendar',
    component: MoodCalendarComponent
  },
  {
    path: 'contact-card',
    component: ContactCardComponent
  },
  {
    path: 'deals',
    component: DealsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then(m => m.ProfilPageModule)
  },
  {
    path: 'forms',
    component: FormsComponent
  },
  {
    path:'user',
    component: UserComponent
  },
  // Добавляем путь в роутинг для перемещения на страницу пометок
  {  
    path:'scilink',
    component: ScilinkComponent
  },{  
    path:'cryptorates',
    component: CryptoRatesComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  },
  {
    path: 'todo-list',
    component: TodoListComponent
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'fashion',
    component: FashionComponent
  },
  {
    path: 'filters',
    loadChildren: () => import('./forms/filters/filters.module').then(m => m.FiltersPageModule)
  },
  {
    path: 'validations',
    loadChildren: () => import('./forms/validations/validations.module').then(m => m.ValidationsPageModule)
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: 'mplayer',
    component: MplayerComponent
  },
  {
    path: 'barcode-scanner',
    component: BarcodeScannerComponent
  },
  {
    path: 'contact-card',
    component: ContactCardComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password-routing.module').then( m => m.ForgotPasswordPageRoutingModule)
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'rss-data',
    component: RssDataComponent
  },
  { path: 'intro',
  component: IntroComponent
},
  { path: 'videoplayer',
    component: VideoPlayerComponent
  },
  { path: 'kanban',
    component: KanbanComponent
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera-routing.module').then( m => m.CameraPageRoutingModule)
    
  },
  {
    path: 'water-tracker',
    loadChildren: () => import('./water-tracker/water-tracker.module').then(m => m.WaterTrackerModule)
  },
  {
    path: 'front-layout',
  component: FrontLayoutComponent
  },
  {
    path: 'drag-and-drop',
  component: DragAndDropComponent
  },
  {
    path: '**',
  redirectTo: 'page-not-found'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
