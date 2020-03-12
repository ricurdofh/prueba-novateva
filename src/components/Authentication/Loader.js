import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default ({show}) => {
  return (
    <div className="loader-bg" style={{display: show ? 'flex': 'none'}}>
      <FontAwesomeIcon icon={faSpinner} className='loader' style={{fontSize:'2em'}} />
    </div>
  )
}