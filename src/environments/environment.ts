// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulator: [],
  functionURL:'https://us-central1-group-saving.cloudfunctions.net/',
  firebase: {
    apiKey: 'AIzaSyCZlASesgqHoCE8YjsXhsJ7IO4-q3OWqlI',
    authDomain: 'group-saving.firebaseapp.com',
    databaseURL: 'https://group-saving.firebaseio.com',
    projectId: 'group-saving',
    storageBucket: 'group-saving.appspot.com',
    messagingSenderId: '444964071176',
    appId: '1:444964071176:web:732f9c6071c5a461b5eebd',
    measurementId: 'G-JC2DKTVF1V'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
