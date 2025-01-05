import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-89fc9.firebaseapp.com",
  projectId: "mern-project-89fc9",
  storageBucket: "mern-project-89fc9.firebasestorage.app",
  messagingSenderId: "792831870318",
  appId: "1:792831870318:web:ebab21478111ae19ef6d7f",
}

export const app = initializeApp(firebaseConfig)
