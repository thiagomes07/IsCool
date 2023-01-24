import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDajLWifCKUI00HXk8lFalQTLCjUvqUevw",
  authDomain: "iscooldb-de788.firebaseapp.com",
  projectId: "iscooldb-de788",
  storageBucket: "iscooldb-de788.appspot.com",
  messagingSenderId: "54737927369",
  appId: "1:54737927369:web:da0fac61131cd3b9e9a118",
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const authentication = getAuth(app);
export const db = getFirestore(app);
