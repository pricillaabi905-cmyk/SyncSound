import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBiDTGrsmaKwsspNnDLQWwIceFhmFj4KdE",
  authDomain: "syncsound-72f3a.firebaseapp.com",
  databaseURL: "https://syncsound-72f3a-default-rtdb.firebaseio.com",
  projectId: "syncsound-72f3a",
  storageBucket: "syncsound-72f3a.firebasestorage.app",
  messagingSenderId: "924896933545",
  appId: "1:924896933545:web:11c9afcf13d4a9fd2a5bb8"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export {
  database,
  ref,
  set,
  get,
  onValue,
  update
};