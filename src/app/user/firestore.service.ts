import { Injectable } from "@angular/core";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence, onAuthStateChanged } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  auth: any;
  UserDB: any;
  userId: string | null = null;

  public userData = initializeApp(environment.firebase, 'userData');

  constructor() {
    this.auth = getAuth(this.userData);
    setPersistence(this.auth, browserLocalPersistence).then(() => {
      console.log('Firebase persistence installed');
    });
    this.UserDB = getFirestore(this.userData);

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        console.log('User ID set:', this.userId);
      } else {
        this.userId = null;
        console.log('User logged out, User ID reset');
      }
    });
  }

  /**
   * Получить данные компонента из коллекции 'profiles' по userId
   * @param componentName - имя компонента (например, 'favorites')
   * @returns данные компонента или null
   */
  async getComponentData(componentName: string): Promise<any | null> {
    try {
      if (!this.userId) {
        console.log('User ID not set.');
        return null;
      }
      const docRef = doc(this.UserDB, 'profiles', this.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data[componentName] ?? null;
      } else {
        console.log(`User profiles document ${this.userId} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error while retrieving component data:', error);
      return null;
    }
  }

  /**
   * Сохранить данные компонента в коллекцию 'profiles' по userId
   * @param componentName - имя компонента (например, 'favorites')
   * @param data - данные для сохранения (например, массив избранных)
   */
  async storeComponentData(componentName: string, data: any): Promise<void> {
    try {
      if (!this.userId) {
        console.log('User ID not installed.');
        return;
      }
      const docRef = doc(this.UserDB, 'profiles', this.userId);
      const docSnap = await getDoc(docRef);
      let updatedData: Record<string, any> = {};
      if (docSnap.exists()) {
        updatedData = docSnap.data() as Record<string, any>;
      }
      updatedData[componentName] = data;
      await setDoc(docRef, updatedData);
      console.log(`Component data "${componentName}" successfully saved for the user ${this.userId}.`);
    } catch (error) {
      console.error('Error saving component data:', error);
    }
  }

  

}


