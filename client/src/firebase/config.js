import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACoC-wVbhN8adoJN_XIucajSY3_MaHZsc",
  authDomain: "resume-crafter-29b18.firebaseapp.com",
  projectId: "resume-crafter-29b18",
  storageBucket: "resume-crafter-29b18.firebasestorage.app",
  messagingSenderId: "554136198194",
  appId: "1:554136198194:web:14e45c310c527df236b02b",
  measurementId: "G-75E6Y7EPVY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
