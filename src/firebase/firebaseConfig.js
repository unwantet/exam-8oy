import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCM264pU2Tduyf3VJeaxlvYYCTKR0AZxVU",
  authDomain: "unwantet-eda.firebaseapp.com",
  projectId: "unwantet-eda",
  storageBucket: "unwantet-eda.appspot.com",
  messagingSenderId: "508355805699",
  appId: "1:508355805699:web:d60911430e84f7a9f18436"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
