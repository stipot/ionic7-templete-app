import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component'
import { ContactCardComponent } from './contact-card/contact-card.component';
import { SettingsComponent } from "./settings/settings.component"

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'forms',
    component: FormsComponent
  },
  {
    path: 'contact-card',
    component: ContactCardComponent
  }, {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'forms', 
    component: FormsComponent
  },
  {
    path: 'filters',
    loadChildren: () => import('./forms/filters/filters.module').then( m => m.FiltersPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
