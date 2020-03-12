import React, { useContext, useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { NameValidator, NumberValidator } from '../../validators';
import { FirebaseContext } from '../../utils/firebase';
import 'firebase/firestore';

export default props => {
  const firebase = useContext(FirebaseContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [last, setLast] = useState('');
  const [address, setAddress] = useState('');
  const [ci, setCI] = useState('');
  const [data, setData] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (props.selected === 'products') {
      setName(props.item.Name || '');
      setDescription(props.item.Description || '');
      setPrice(props.item.Price || '');
      setQuantity(props.item.Quantity || '');
    } else {
      setName(props.item.Name || '');
      setLast(props.item.Last || '');
      setAddress(props.item.Address || '');
      setCI(props.item.CI || '');
    }
  }, [props.action, props.item, props.selected]);

  useEffect(() => {
    switch (props.selected) {
      case 'products':
        setData({
          Name: name,
          Description: description,
          Price: price,
          Quantity: quantity
        });
        setIsValid(
          NameValidator(name) &&
          NumberValidator(price) &&
          NumberValidator(quantity) &&
          description !== ''
        );
        break;
      case 'clients':
        setData({
          Name: name,
          Last: last,
          Address: address,
          CI: ci
        });
        setIsValid(
          NameValidator(name) &&
          NameValidator(last) &&
          ci !== '' &&
          address !== ''
        );
    }
  }, [name, description, price, quantity, last, address, ci, props.selected]);

  const handleClick = () => {
    if (isValid) {
      const selected = props.selected === 'products' ? 'producto' : 'cliente';
      switch (props.action) {
        case 'add':
          firebase.firestore().collection(props.selected).add(data).then(() => {
            NotificationManager.success(`El ${selected} se ha agregado con éxito.`, 'Agregado');
          }).catch(() => {
            NotificationManager.error(`Ocurrió un error al agregar el ${selected}`)
          });
          break;
        case 'edit':
          firebase.firestore().collection(props.selected).doc(props.item.id).update(data).then(() => {
            NotificationManager.success(`El ${selected} se ha modificado con éxito.`, 'Modificado');
          }).catch(() => {
            NotificationManager.error(`Ocurrió un error al modificar el ${selected}`)
          });
          break;
        case 'delete':
          firebase.firestore().collection(props.selected).doc(props.item.id).delete().then(() => {
            NotificationManager.success(`El ${selected} se ha eliminado con éxito.`, 'Eliminado');
          }).catch(() => {
            NotificationManager.error(`Ocurrió un error al eliminar el ${selected}`)
          });
      }
    }
  };

  return (
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 className="modal-title" id="myModalLabel">
              {props.action === 'add' ? 'Agregar ' : props.action === 'edit' ? 'Editar ' : 'Eliminar '}
              {props.selected === 'products' ? 'Producto' : 'Cliente'}
            </h4>
          </div>
          <div className="modal-body">
            {props.action !== 'delete' && props.selected === 'products' &&
            <div className="modal-form">
              <input
                type="text"
                className="auth-input modal-input"
                placeholder="Nombre"
                onChange={e => setName(e.target.value)}
                value={name}/>
              <input
                type="text"
                className="auth-input modal-input"
                placeholder="Precio"
                onChange={e => setPrice(e.target.value)}
                value={price}/>
              <input
                type="text"
                className="auth-input modal-input"
                placeholder="Cantidad"
                onChange={e => setQuantity(e.target.value)}
                value={quantity}/>
              <textarea
                className="auth-input modal-input"
                placeholder="Descripción"
                onChange={e => setDescription(e.target.value)}
                value={description}>
              </textarea>
            </div>}
            {props.action !== 'delete' && props.selected === 'clients' &&
            <div className="modal-form">
              <input
                type="text"
                className="auth-input modal-input"
                placeholder="Nombre"
                onChange={e => setName(e.target.value)}
                value={name}/>
              <input
                type="text"
                className="auth-input modal-input"
                placeholder="Apellido"
                onChange={e => setLast(e.target.value)}
                value={last}/>
              <input
                type="text"
                className="auth-input modal-input"
                placeholder="Cédula"
                onChange={e => setCI(e.target.value)}
                value={ci}/>
              <textarea
                className="auth-input modal-input"
                placeholder="Dirección"
                onChange={e => setAddress(e.target.value)}
                value={address}>
              </textarea>
            </div>}
            {props.action === 'delete' && 
            <div>¿Está seguro que desea eliminar este {props.selected === 'products' ? 'producto' : 'cliente'}?</div>
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleClick} data-dismiss="modal" disabled={!isValid}>
              {props.action === 'add' ? 'Agregar' : props.action === 'edit' ? 'Editar' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}