import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRvW0f0GrcPbHl1xWUDZZ-uLzqQCuqN1k",
  authDomain: "linkedin-clone-4cfa4.firebaseapp.com",
  projectId: "linkedin-clone-4cfa4",
  storageBucket: "linkedin-clone-4cfa4.appspot.com",
  messagingSenderId: "768110013250",
  appId: "1:768110013250:web:628e10af29c087738976db",
  measurementId: "G-NL64B31N8Q",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
