import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}
  // Метод получения писем из базы данных
  getNotes() {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef);
  }
  addNote(text: any) {
    const notesRef = collection(this.firestore, 'notes');
    addDoc(notesRef, { text: text });
  }
}
