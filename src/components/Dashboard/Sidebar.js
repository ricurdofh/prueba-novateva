import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUsers } from '@fortawesome/free-solid-svg-icons';

export default props => {
  return (    
    <div id="sidebar" className="nav-collapse ">
      <ul className="sidebar-menu" id="nav-accordion">
        <li className="section">
          <div className={props.selected === 'products' ? "active": ""}
            onClick={() => props.handleSelected('products')}>
            <FontAwesomeIcon icon={faStore} style={styles.fonts} />
            <span>PRODUCTOS</span>
          </div>
        </li>
        <li className="section">
          <div className={props.selected === 'clients' ? "active": ""}
            onClick={() => props.handleSelected('clients')}>
            <FontAwesomeIcon icon={faUsers} style={styles.fonts} />
            <span>CLIENTES</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

const styles = {
  fonts: {
    fontSize: '15px',
    paddingRight: '6px'
  }
}