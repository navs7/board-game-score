import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, push, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCV7xbAOEXQDJrv3wQtprqKFlQc5kzMCiA",
  authDomain: "board-game-score-b9ad0.firebaseapp.com",
  projectId: "board-game-score-b9ad0",
  storageBucket: "board-game-score-b9ad0.firebasestorage.app",
  messagingSenderId: "505020668714",
  appId: "1:505020668714:web:a40ade03386ddf6acbdc53",
  databaseURL: "https://board-game-score-b9ad0-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, ref, set, onValue, get, push, remove, auth, signInWithEmailAndPassword, signOut, onAuthStateChanged };
