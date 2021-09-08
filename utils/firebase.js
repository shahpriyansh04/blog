import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
var firebaseConfig = {
  
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
