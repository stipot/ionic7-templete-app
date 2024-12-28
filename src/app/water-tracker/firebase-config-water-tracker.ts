import { initializeApp, getApps } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

const secondFirebaseConfig = {
  apiKey: "AIzaSyBIAlgmzGbmcIRanMtnm7C5COqUC1jRzAM",
  authDomain: "water-trackerr.firebaseapp.com",
  projectId: "water-trackerr",
  storageBucket: "water-trackerr.firebasestorage.app",
  messagingSenderId: "32859637006",
  appId: "1:32859637006:web:0a5e83dadf81630f10c35f"
};

export const waterTrackerApp = initializeApp(secondFirebaseConfig, 'water-tracker');

const auth = getAuth(waterTrackerApp);
setPersistence(auth, browserLocalPersistence).then(() => {
  console.log('Firebase persistence установлено');
});
