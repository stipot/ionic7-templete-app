import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ROUTES, RouteReuseStrategy, RoutesRecognized, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18s/', 'json');
}

if (environment.production) {
  enableProdMode();
}


bootstrapApplication (AppComponent, {
    providers: [
      {  provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      importProvidersFrom(IonicModule.forRoot({})),
      importProvidersFrom(HttpClientModule),
      importProvidersFrom(TranslateModule.forRoot(
        {
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        }  
        
      )),
      provideRouter(ROUTES),
  ]
});
        


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  
