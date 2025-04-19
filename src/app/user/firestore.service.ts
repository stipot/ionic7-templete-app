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
    apiKey: "AIzaSyAhyDd5SI8sFRPNkMH_kvgcsyjxe9AF_4Q",
    authDomain: "ionic7-templete-app-public.firebaseapp.com",
    projectId: "ionic7-templete-app-public",
    storageBucket: "ionic7-templete-app-public.appspot.com",
    messagingSenderId: "822636124132",
    appId: "1:822636124132:web:a65c67da73bd8e03e099f1",
    measurementId: "G-R13DHHMDRQ"
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
    console.log(colRef, "colRef")
    await addDoc(colRef, data);
  }

  async getAllData(collectionName: string, userId: string): Promise<any[]> {
    const colRef = collection(this.UserDB, collectionName);
    console.log(colRef, "colRef")
    const snapshot = await getDocs(colRef);
    console.log(snapshot, "snapshot")
    return snapshot.docs.map(doc => doc.data());
  }

  async checkUserExists(userId: string): Promise<boolean> {
    const usersRef = collection(this.UserDB, 'users');
    console.log(usersRef, "usersRef")
    const snapshot = await getDocs(usersRef);
    console.log(userId, "userId")
    console.log("snapshot.docs", snapshot.docs)
    return snapshot.docs.some(doc => doc.id === userId);
  }

  

}
