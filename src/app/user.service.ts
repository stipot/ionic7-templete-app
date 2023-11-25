import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}
  // Метод получения писем из базы данных
  getData(collectionName: any) {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef);
  }
  // Метод для записи в коллекцию
  addData(text: any, collectionName: any) {
    const collectionRef = collection(this.firestore, collectionName);
    addDoc(collectionRef, { text: text });
  }
}
