// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Передаем ionic приложению информацию о базе данных
  // firebase: {
  //   apiKey: 'AIzaSyDHZreU4wX54E31XNZNMaRgTiRgm_n010k',
  //   authDomain: 'ionic-app-b2c84.firebaseapp.com',
  //   projectId: 'ionic-app-b2c84',
  //   storageBucket: 'ionic-app-b2c84.appspot.com',
  //   messagingSenderId: '159501970192',
  //   appId: '1:159501970192:web:fab11f263e3c03d24d9395',
  // },
  firebase: {
    apiKey: "AIzaSyAhyDd5SI8sFRPNkMH_kvgcsyjxe9AF_4Q",
    authDomain: "ionic7-templete-app-public.firebaseapp.com",
    projectId: "ionic7-templete-app-public",
    storageBucket: "ionic7-templete-app-public.appspot.com",
    messagingSenderId: "822636124132",
    appId: "1:822636124132:web:a65c67da73bd8e03e099f1",
    measurementId: "G-R13DHHMDRQ"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
