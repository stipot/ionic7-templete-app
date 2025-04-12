import { Injectable } from "@angular/core";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  auth: any
  UserDB:any
  private secondFirebaseConfig = {
    apiKey: "AIzaSyBIAlgmzGbmcIRanMtnm7C5COqUC1jRzAM",
    authDomain: "water-trackerr.firebaseapp.com",
    projectId: "water-trackerr",
    storageBucket: "water-trackerr.firebasestorage.app",
    messagingSenderId: "32859637006",
    appId: "1:32859637006:web:0a5e83dadf81630f10c35f"
  };
  public userData = initializeApp(this.secondFirebaseConfig, 'userData');
  constructor() {
    this.auth = getAuth(this.userData);
    setPersistence(this.auth, browserLocalPersistence).then(() => {
      console.log('Firebase persistence установлено');
    });
    this.UserDB = getFirestore(this.userData)
  }

  async addData(collectionName: string, data: any): Promise<void> {
    const colRef = collection(this.UserDB, collectionName);
    await addDoc(colRef, data);
  }

  async getAllData(collectionName: string): Promise<any[]> {
    const colRef = collection(this.UserDB, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => doc.data());
  }

  async checkUserExists(userId: string): Promise<boolean> {
    const usersRef = collection(this.UserDB, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.some(doc => doc.id === userId);
  }
}
