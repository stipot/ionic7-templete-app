import { Injectable } from "@angular/core";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  auth: any;
  UserDB: any;
  userId: string | null = null;

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
    this.UserDB = getFirestore(this.userData);

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        console.log('User ID установлен:', this.userId);
      } else {
        this.userId = null;
        console.log('User вышел, User ID сброшен');
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
        console.log('User ID не установлен.');
        return null;
      }
      const docRef = doc(this.UserDB, 'profiles', this.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data[componentName] ?? null;
      } else {
        console.log(`Документ profiles пользователя ${this.userId} не найден.`);
        return null;
      }
    } catch (error) {
      console.error('Ошибка при получении данных компонента:', error);
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
        console.log('User ID не установлен.');
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
      console.log(`Данные компонента "${componentName}" успешно сохранены для пользователя ${this.userId}.`);
    } catch (error) {
      console.error('Ошибка при сохранении данных компонента:', error);
    }
  }

  

}


