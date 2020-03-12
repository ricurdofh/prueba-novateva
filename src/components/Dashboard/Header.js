import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FirebaseContext } from '../../utils/firebase';
import 'firebase/auth';

export default props => {
  const firebase = useContext(FirebaseContext);
  const onBarsClick = () => {
    props.toggleSideBar();
  }
  return(
    <header className="header black-bg">
      <div className="sidebar-toggle-box">
        <div
          className="fa fa-bars"
          data-placement="right"
          data-original-title="Toggle Navigation"
          onClick={onBarsClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className="logo"><b>DASHBOARD</b></div>
      <div className="top-menu">
        <ul className="nav pull-right top-menu">
          <li><div className="logout" onClick={() => firebase.auth().signOut()}>SALIR</div></li>
        </ul>
      </div>
    </header>
  )
}