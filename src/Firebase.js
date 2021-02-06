// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDeJ3QrfE0ksWvaGGlH0ECGJtPuir-eM0w",
    authDomain: "instagram-bittu.firebaseapp.com",
    projectId: "instagram-bittu",
    storageBucket: "instagram-bittu.appspot.com",
    messagingSenderId: "1025447122196",
    appId: "1:1025447122196:web:3fd142ea2033bb906f5e01",
    measurementId: "G-CR7GQC95JS"
  });
 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const storage = firebase.storage();

 export {db,auth,storage}
 export default db;