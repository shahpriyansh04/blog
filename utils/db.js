import firebase from 'firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createPost(title, description, uid) {
  return firestore
    .collection('posts')
    .add({ title: title, description: description, userID: uid })
    .then(() => {
      console.log('SUCCESS');
    });
}
