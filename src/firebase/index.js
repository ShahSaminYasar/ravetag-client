import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiNyDfhYaQvCHJXygkitiReyPxu9W-HIk",
  authDomain: "ravetag-76898.firebaseapp.com",
  projectId: "ravetag-76898",
  storageBucket: "ravetag-76898.appspot.com",
  messagingSenderId: "407767190523",
  appId: "1:407767190523:web:2f9df06b3fdcb90ac1d95e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
