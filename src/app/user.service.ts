import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, addDoc, deleteDoc, setDoc, getDoc, updateDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly ID = "qGgoKvgwaNBLU2ooS4eP"
  constructor(private firestore: Firestore) {}
  /**
   * Get data from Firestore
   * @param collectionName - component name
   * @returns - json data
   */
  // getData(collectionName: any) {
  //   const collectionRef = collection(this.firestore, collectionName);
  //   return collectionData(collectionRef);
  // }

  async getData(collectionName: any) {
    const docRef = doc(this.firestore, collectionName, this.ID);
    const docSnap = await getDoc(docRef);
    console.log(docSnap, docSnap.data(), docSnap.get("data"))
    return docSnap.get("data")
  }

  async updateData(collectionName:any,items: any) {
    const cityRef = doc(this.firestore, collectionName, this.ID);
    await updateDoc(cityRef, { data: {items} });
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
  
  async removeData(data: any, collectionName: any) {
    console.log(data, collectionName)
    await deleteDoc(doc(this.firestore, collectionName, data));
  }
}
