import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
var firebaseConfig = {
  apiKey: 'AIzaSyBp7KqqA_ieVOq_gfi2cKlrf_U-HukSIVY',
  authDomain: 'blog-7d745.firebaseapp.com',
  projectId: 'blog-7d745',
  storageBucket: 'blog-7d745.appspot.com',
  messagingSenderId: '1078222586075',
  appId: '1:1078222586075:web:9e00aab1d1fd5de3e74cfe'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
