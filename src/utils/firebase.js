import React, { createContext } from 'react';
import app from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBozB8mjdIKJkSMwyaaH5kOwX3t7J364wU",
  authDomain: "pruebareact-d61f6.firebaseapp.com",
  databaseURL: "https://pruebareact-d61f6.firebaseio.com",
  projectId: "pruebareact-d61f6",
  storageBucket: "pruebareact-d61f6.appspot.com",
  messagingSenderId: "916796727888",
  appId: "1:916796727888:web:abbce8aa8c6462124a6755"
};

const FirebaseContext = createContext(null);
export { FirebaseContext };

export default ({children}) => {
  if (!app.apps.length) {
    app.initializeApp(firebaseConfig);
  }

  return (
    <FirebaseContext.Provider value={app}>
      { children }
    </FirebaseContext.Provider>
  )
}