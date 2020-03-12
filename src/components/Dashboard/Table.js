import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faFileSignature,
  faAddressBook,
  faQuestionCircle,
  faIdCard,
  faDollarSign,
  faHashtag,
  faPencilAlt,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { FirebaseContext } from '../../utils/firebase';
import 'firebase/firestore';

export default props => {
  const [data, setData] = useState([]);
  const [action, setAction] = useState('add');
  const [item, setItem] = useState({});
  const firebase = useContext(FirebaseContext);

  firebase.firestore().collection(props.selected).get().then(q => {    
    setData(q.docs.map(doc => ({id: doc.id, ...doc.data()})));
  });

  const handleClick = (action, item) => {
    setAction(action);
    setItem(item);
  }

  return (    
    <section id="main-content">
      <section className="wrapper">
        <div className="row section">
          <div className="col-md-12">
            <div className="content-panel">
              {props.selected === 'products' &&
              <h4><FontAwesomeIcon icon={faAngleRight} /> Productos</h4>
              }
              {props.selected === 'clients' &&
              <h4><FontAwesomeIcon icon={faAngleRight} /> Clientes</h4>
              }
              <hr />
              <table className="table table-striped table-advance table-hover">
                <thead>
                  {props.selected === 'products' &&
                  <tr>
                    <th><FontAwesomeIcon icon={faFileSignature} /> Nombre</th>
                    <th className="hidden-col"><FontAwesomeIcon icon={faQuestionCircle} /> Descripción</th>
                    <th><FontAwesomeIcon icon={faDollarSign} /> Precio</th>
                    <th><FontAwesomeIcon icon={faHashtag} /> Cantidad</th>
                    <th></th>
                  </tr>}
                  {props.selected === 'clients' &&
                  <tr>
                    <th><FontAwesomeIcon icon={faFileSignature} /> Nombre</th>
                    <th><FontAwesomeIcon icon={faFileSignature} /> Apellido</th>
                    <th className="hidden-col"><FontAwesomeIcon icon={faAddressBook} /> Dirección</th>
                    <th><FontAwesomeIcon icon={faIdCard} /> Cédula</th>
                    <th></th>
                  </tr>}
                </thead>
                <tbody>
                  {props.selected === 'products' && data.map((product, i) =>
                    <tr key={product.id}>
                      <td>{product.Name}</td>
                      <td className="hidden-col">{product.Description}</td>
                      <td>{product.Price}$ </td>
                      <td>{product.Quantity}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-xs"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => handleClick('edit', product)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button
                          className="btn btn-danger btn-xs"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => handleClick('delete', product)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  )}
                  {props.selected === 'clients' && data.map(client =>
                    <tr key={client.id}>
                      <td>{client.Name}</td>
                      <td>{client.Last}</td>
                      <td className="hidden-col">{client.Address}</td>
                      <td>{client.CI}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-xs"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => handleClick('edit', client)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button
                          className="btn btn-danger btn-xs"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => handleClick('delete', client)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="add-task-row">
              <div
                className="btn btn-success btn-sm pull-left"
                data-toggle="modal"
                data-target="#myModal"
                onClick={() => handleClick('add', {})}>
                  Agregar {props.selected === 'products' ? 'Producto' : 'Cliente'}
              </div>
            </div>
          </div>
        </div>
        <Modal selected={props.selected} action={action} item={item} />
        <NotificationContainer />
      </section>
    </section>
  )
}