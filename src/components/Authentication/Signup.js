import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Base from './Base';
import {EmailValidator, PasswordValidator} from '../../validators';
import { FirebaseContext } from '../../utils/firebase';
import 'firebase/auth';

export default () => {
  const history = useHistory();
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push('/dashboard');
      }
    });
  }, [firebase, history]);

  useEffect(() =>{
    setValid(
      EmailValidator(email) &&
      PasswordValidator(password) &&
      password === passwordConfirm
    );
  }, [email, password, passwordConfirm]);

  const handleClick = () => {
    if(valid) {
      setShowLoader(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(a => {
          history.push('/dashboard');
        })
        .catch(error => {
          setShowLoader(false);
          setError(error.message);
        });
    }
  }

  return (
    <Base showLoader={showLoader}>
      <input
        type="text"
        placeholder="Email"
        className="auth-input"
        onChange={e => setEmail(e.target.value)}>
      </input>
      <input
        type="password"
        placeholder="Contraseña"
        className="auth-input"
        onChange={e => setPassword(e.target.value)}>
      </input>
      <input
        type="password"
        placeholder="Confirmar contraseña"
        className="auth-input"
        onChange={e => setPasswordConfirm(e.target.value)}>
      </input>
      <div className={valid ? 'button': 'button button-inactive'} onClick={handleClick}>REGISTRARSE</div>
      {error !== '' && <div className="error">{error}</div>}
    </Base>
  )
}