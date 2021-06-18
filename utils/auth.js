import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import { createUser } from './db';
import axios from 'axios';
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
const doesUserExist = async (email) => {
  const response = await axios
    .get('/api/users/', { params: { email: email } })
    .then((response) => {
      console.log(response.data);
    });
  console.log(response);
};
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const handleUser = (rawUser) => {
    if (rawUser) {
      const newUser = formatUser(rawUser);
      if (!doesUserExist(newUser.email)) {
        createUser(user.uid, newUser);
      }

      setUser(newUser);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };
  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      })
      .catch((error) => {
        console.log(error.message);
        throw error.message;
      });
  };

  const signupWithEmail = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signinWithEmail = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
      });
  };

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signupWithEmail,
    signinWithEmail,
    signout
  };
}
const formatUser = (user) => {
  return {
    uid: user.uid,
    username: '1',
    email: user.email,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};
