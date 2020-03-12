import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Base from './Base';
import { FirebaseContext } from '../../utils/firebase';
import 'firebase/auth';

export default () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  
  const handleClick = (page) => {
    history.push(`/${page}`)
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push('/dashboard');
      }
    });
  }, [firebase, history]);

  return (
    <Base>
      <div onClick={() => handleClick('login')} className="button">ENTRAR</div>
      <div onClick={() => handleClick('signup')} className="button">REGISTRO</div>
    </Base>
  )
}