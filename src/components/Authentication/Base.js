import React from 'react';
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default ({children, showLoader}) => {
  return (
    <div className="App-wrapper">
      <div className= 'auth-box'>
        <FontAwesomeIcon icon={faUser} style={{fontSize:'2em'}} />
        { children }
      </div>
      <Loader show={showLoader} />
    </div>
  )
}