import { getFirestore } from "firebase/firestore";
import { waterTrackerApp } from "../firebase-config-water-tracker";

export const waterTrackerDb = getFirestore(waterTrackerApp);
