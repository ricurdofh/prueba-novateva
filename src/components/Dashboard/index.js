import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import Table from './Table';
import windowSize from '../../utils/windowSize';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../utils/firebase';
import 'firebase/auth'

export default () => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const size = windowSize();
  const [selected, setSelected] = useState('products');
  const [sideBarStatus, setSideBarStatus] = useState(size.width > 768);
  const toggleSideBar = () => {
    setSideBarStatus(!sideBarStatus);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        history.push('/');
      }
    });
  }, [firebase, history]);

  useEffect(() => {
    setSideBarStatus(size.width > 768);
  }, [size]);

  const handleSelected = option => {
    setSelected(option)
  }

  return (
    <div id="container" className={sideBarStatus ? "" : "sidebar-closed"}>
      <Header toggleSideBar={toggleSideBar} />
      <SideBar selected={selected} handleSelected={handleSelected} />
      <Table selected={selected} />
    </div>
  )
}