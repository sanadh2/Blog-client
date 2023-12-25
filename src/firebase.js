import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkAqCYByECyPzqa_1DfXfWcEGURWIYhFQ",
  authDomain: "blog-10df3.firebaseapp.com",
  projectId: "blog-10df3",
  storageBucket: "blog-10df3.appspot.com",
  messagingSenderId: "237425822692",
  appId: "1:237425822692:web:b4344cf5ba0b6744bdd5f1",
};

const app = initializeApp(firebaseConfig);

export const DB = getStorage(app);
