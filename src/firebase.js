import firebase from './firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCH9P243Kwxh4hj8IwbNnNyU2cNH4O8k3A",
    authDomain: "insta-clone-react-6b542.firebaseapp.com",
    databaseURL: "https://insta-clone-react-6b542-default-rtdb.firebaseio.com",
    projectId: "insta-clone-react-6b542",
    storageBucket: "insta-clone-react-6b542.appspot.com",
    messagingSenderId: "468907489710",
    appId: "1:468907489710:web:19ef8c00caeb91eb48b03f",
    measurementId: "G-HH7G94DF3M"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


export default db;