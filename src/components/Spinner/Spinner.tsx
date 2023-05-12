import React from 'react';
import './styles.css';
import { ISpinnerProps } from '../../types';

const Spinner = ({ top, left }: ISpinnerProps) => {
  return (
    <div
      style={{ top: `${top}px`, left: `${left}px` }}
      className="spinner-border main-spinner"
      role="status"
    ></div>
  );
};

export default Spinner;
