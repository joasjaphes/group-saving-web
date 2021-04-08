import { USE_EMULATOR as AUTH_EMULATOR } from '@angular/fire/auth';
import { USE_EMULATOR as FIRESTORE_EMULATOR, SETTINGS } from '@angular/fire/firestore';
import { USE_EMULATOR as DATABASE_EMULATOR } from '@angular/fire/database';
import { USE_EMULATOR as FUNCTIONS_EMULATOR } from '@angular/fire/functions';

export const environment = {
  production: false,
  useEmulator: [{
    provide: AUTH_EMULATOR,
    useValue: ['localhost', 9099],
  },
  {
    provide: FIRESTORE_EMULATOR,
    useValue: ['localhost', 8080],
  },
  {
    provide: DATABASE_EMULATOR,
    useValue: ['localhost', 9000],
  },
  {
    provide: FUNCTIONS_EMULATOR,
    useValue: ['localhost', 5001],
  },
  {
    provide: SETTINGS,
    useValue: {
      host: 'localhost:8080',
      experimentalForceLongPolling: true,
      ssl: false
    }
  }
],
  functionURL:'http://localhost:5001/group-saving-test/us-central1/',
  firebase: {
    host: 'localhost:5000',
    ssl: false,
    //apiKey: 'AIzaSyCZlASesgqHoCE8YjsXhsJ7IO4-q3OWqlI',
    apiKey: '444964071176',
    authDomain: 'localhost:9099',
    databaseURL: 'http://localhost:9000',
    projectId: 'group-saving-test',
    //storageBucket: 'group-saving.appspot.com',
    messagingSenderId: '444964071176',
    appId: '1:444964071176:web:732f9c6071c5a461b5eebd',
    measurementId: 'G-JC2DKTVF1V',
    experimentalForceLongPolling: true
  }
};
