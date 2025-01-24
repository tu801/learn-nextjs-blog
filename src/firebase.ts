// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "learn-nextjs15-blog.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "learn-nextjs15-blog.firebasestorage.app",
  messagingSenderId: "600351755935",
  appId: "1:600351755935:web:36daad3842e6ba1066dcaa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
