import React, { MutableRefObject, useRef, useState } from 'react';
import './styles.css';
import { ICostsItemProps } from '../../../types';
import { getAuthDataFromLS, handleAlertMessage } from '../../../utils/auth';
import { deleteCostsFx, updateCostFx } from '../../../api/costsClient';
import { removeCost, updateCost } from '../../../context';
import Spinner from '../../Spinner/Spinner';
import { formatDate } from '../../../utils/arrayUtils';
import { validationInputs } from '../../../utils/validation';

const CostsItem = ({ cost, index }: ICostsItemProps) => {
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editSpinner, setEditSpinner] = useState(false);
  const [newText, setNewText] = useState(cost.text);
  const [newPrice, setNewPrice] = useState<string | number>(cost.price);
  const [newDate, setNewDate] = useState(cost.date);

  const textRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewText(event.target.value);

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewPrice(event.target.value);

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewDate(event.target.value);

  const allowEditCost = () => setEdit(true);

  const cancelEdit = () => {
    setEdit(false);
    setEditSpinner(false);
  };

  const handleEditCost = async () => {
    setEditSpinner(true);

    if (newText === cost.text && +newPrice === +cost.price && newDate === cost.date) {
      setEditSpinner(false);
      setEdit(false);
      return;
    }

    if (!validationInputs(textRef, priceRef, dateRef)) {
      setEditSpinner(false);
      return;
    }

    const authData = getAuthDataFromLS();

    const updatedCost = await updateCostFx({
      url: '/cost',
      token: authData.access_token,
      cost: { text: newText, price: +newPrice, date: newDate },
      id: cost._id as string,
    });

    if (!updatedCost) {
      setEditSpinner(false);
      setEdit(false);
      return;
    }

    setEdit(false);
    setEditSpinner(false);
    updateCost(updatedCost);
    handleAlertMessage({ alertText: 'Успешно обновлено', alertStatus: 'success' });
  };

  const deleteCost = async () => {
    setDeleteSpinner(true);

    const authData = getAuthDataFromLS();

    await deleteCostsFx({
      url: '/cost',
      token: authData.access_token,
      id: cost._id as string,
    });

    setDeleteSpinner(false);
    removeCost(cost._id as string);
    handleAlertMessage({ alertText: 'Успешно удалено!', alertStatus: 'success' });
  };

  return (
    <li
      className="cost-item d-flex list-group-item justify-content-between align-items-center"
      id={cost._id as string}
    >
      <div className="cost-item-left">
        <span style={{ whiteSpace: 'nowrap' }}>Расход №{index}</span>
        {edit ? (
          <input
            value={newText}
            onChange={handleChangeText}
            type="text"
            ref={textRef}
            className="form-control cost-item_shop-input"
          />
        ) : (
          <span> "{cost.text}"</span>
        )}
        {edit ? (
          <input
            value={new Date(newDate).toISOString().split('T')[0]}
            onChange={handleChangeDate}
            ref={dateRef}
            type="date"
            className="form-control cost-item_date-input"
          />
        ) : (
          <span className="cost-date">Дата {formatDate(cost.date as string)}</span>
        )}
      </div>
      <div className="cost-item-right d-flex align-items-center">
        {edit ? (
          <input
            value={newPrice}
            onChange={handleChangePrice}
            ref={priceRef}
            type="text"
            className="form-control cost-item_price-input"
          />
        ) : (
          <span style={{ marginRight: '10px' }}>Сумма {cost.price}р.</span>
        )}

        {edit ? (
          <div className="btn-block__inner">
            <button className="btn btn-success btn-save" onClick={handleEditCost}>
              {editSpinner ? <Spinner top={5} left={38} /> : 'Сохранить'}
            </button>
            <button className="btn btn-danger btn-cancel" onClick={cancelEdit}>
              Отмена
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-edit" onClick={allowEditCost}>
            Изменить
          </button>
        )}

        <button className="btn btn-danger btn-delete" onClick={deleteCost}>
          {deleteSpinner ? <Spinner top={5} left={5} /> : <span>&times;</span>}
        </button>
      </div>
    </li>
  );
};

export default CostsItem;
