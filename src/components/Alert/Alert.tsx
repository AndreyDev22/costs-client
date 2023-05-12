import React from 'react';
import './styles.css';
import { IAlertProps } from '../../types';

const Alert = ({ props }: IAlertProps) => {
  return <div className={`alert alert-wrapper alert-${props.alertStatus}`}>{props.alertText}</div>;
};

export default Alert;
