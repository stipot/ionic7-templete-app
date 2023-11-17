import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}
  // Метод получения писем из базы данных
  getMails() {
    const mailsRef = collection(this.firestore, 'mail');
    return collectionData(mailsRef);
  }
}
