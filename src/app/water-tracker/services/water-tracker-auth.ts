import { getAuth } from "firebase/auth";
import { waterTrackerApp } from "../firebase-config-water-tracker";

export const waterTrackerAuth = getAuth(waterTrackerApp);
