import db from '../../utils/firebase-admin';
import { useState } from 'react';
export default async (req, res) => {
  // const [doesUserExist, setDoesUserExist] = useState(false);
  let doesUserExist = false;
  const snapshot = await db.collection('users').get();
  const users = [];
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  users.forEach((user) => {
    if (req.query.email === user.email) {
      doesUserExist = true;
    }
  });
  // console.log(users[0].email);
  console.log(doesUserExist);
  return res.status(200).json(doesUserExist);
};
