// firebase.js (Using Firebase version 9)
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCKRlygrqyxkeo6ESEHqEAWWA_SQJ4ybZI",
  authDomain: "fir-react-ce71b.firebaseapp.com",
  databaseURL:
    "https://fir-react-ce71b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-react-ce71b",
  storageBucket: "fir-react-ce71b.appspot.com",
  messagingSenderId: "719879371803",
  appId: "1:719879371803:web:2865886dfe9a92a1770cbe",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const databasePath = "/users/forms";

export { database };
