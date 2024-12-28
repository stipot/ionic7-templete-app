import { Injectable } from "@angular/core";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { waterTrackerDb } from "./water-tracker-db";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private db = waterTrackerDb;

  constructor() {}

  async addData(collectionName: string, data: any): Promise<void> {
    const colRef = collection(this.db, collectionName);
    await addDoc(colRef, data);
  }

  async getAllData(collectionName: string): Promise<any[]> {
    const colRef = collection(this.db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => doc.data());
  }
}
