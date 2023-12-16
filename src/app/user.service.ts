import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}
  /**
   * Get data from Firestore
   * @param collectionName - component name
   * @returns - json data
   */
  getData(collectionName: any) {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef);
  }
  
  /**
   * Data store in Firestore
   * @param data - json data
   * @param collectionName - component name
   */
  addData(data: any, collectionName: any) {
    const collectionRef = collection(this.firestore, collectionName);
    addDoc(collectionRef, { data: data });
  }
}
