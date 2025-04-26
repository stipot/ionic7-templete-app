import { Injectable } from "@angular/core";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc 
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  auth: any;
  UserDB: any;

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
  }

  // Старые методы

  async addData(collectionName: string, data: any): Promise<void> {
    const colRef = collection(this.UserDB, collectionName);
    console.log(colRef, "colRef");
    await addDoc(colRef, data);
  }

  async getAllData(collectionName: string, userId: string): Promise<any[]> {
    const colRef = collection(this.UserDB, collectionName);
    console.log(colRef, "colRef");
    const snapshot = await getDocs(colRef);
    console.log(snapshot, "snapshot");
    return snapshot.docs.map(doc => doc.data());
  }

  async checkUserExists(userId: string): Promise<boolean> {
    const usersRef = collection(this.UserDB, 'users');
    console.log(usersRef, "usersRef");
    const snapshot = await getDocs(usersRef);
    console.log(userId, "userId");
    console.log("snapshot.docs", snapshot.docs);
    return snapshot.docs.some(doc => doc.id === userId);
  }

  // Новые методы

  /**
   * Получить данные компонента пользователя из коллекции profiles по userId
   * @param userId - ID пользователя
   * @param componentName - имя компонента (ключ поля в документе)
   * @returns данные компонента или null
   */
  async getComponentData(userId: string, componentName: string): Promise<any | null> {
    try {
      const docRef = doc(this.UserDB, 'profiles', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data[componentName] ?? null;
      } else {
        console.log(`Документ профиля пользователя ${userId} не найден.`);
        return null;
      }
    } catch (error) {
      console.error('Ошибка при получении данных компонента:', error);
      return null;
    }
  }

  /**
   * Сохранить данные компонента пользователя в коллекции profiles по userId
   * @param userId - ID пользователя
   * @param componentName - имя компонента (ключ поля)
   * @param data - данные для сохранения (словарь)
   */
  async storeComponentData(userId: string, componentName: string, data: any): Promise<void> {
    try {
      const docRef = doc(this.UserDB, 'profiles', userId);
      const docSnap = await getDoc(docRef);
      let updatedData: Record<string, any> = {};
      if (docSnap.exists()) {
        updatedData = docSnap.data() as Record<string, any>;
      }
      updatedData[componentName] = data;
      await setDoc(docRef, updatedData);
      console.log(`Данные компонента "${componentName}" успешно сохранены для пользователя ${userId}.`);
    } catch (error) {
      console.error('Ошибка при сохранении данных компонента:', error);
    }
  }
}
