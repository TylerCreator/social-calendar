import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBIJfHyA7uoFylvEHOOb0hakGQowkd2IjU",
  authDomain: "social-calendar-2c12e.firebaseapp.com",
  databaseURL: "https://social-calendar-2c12e.firebaseio.com",
  projectId: "social-calendar-2c12e",
  storageBucket: "",
  messagingSenderId: "568368341914"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
export { db, auth, googleProvider };
