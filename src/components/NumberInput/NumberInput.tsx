import React from 'react';
import './NumberInput.scss';
import { useDispatch } from 'react-redux';
import { setConveyorFormData, calculatePrice } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { IConveyorFormData } from '../../types/IConveyorFormData';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';

interface NumberInputProps {
  name: keyof IConveyorFormData;
}

export const NumberInput: React.FC<NumberInputProps> = ({ name }) => {
  const dispatch = useDispatch();
  const conveyorData = useSelector((state: RootState) => state.conveyorFormData);
  const value = useSelector((state: RootState) => state.conveyorFormData[name]) || 0;

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updatedValue = value ? (+value + 1) : 0;
    updateData(updatedValue);
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updatedValue = value ? (+value - 1) : 0;
    updateData(updatedValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = Math.max(parseInt(event.target.value, 10), 1);
    updateData(updatedValue);
  }

  const updateData = (value: number) => {
    const updatedData = { ...conveyorData, [name]: value }; 
    dispatch(setConveyorFormData(updatedData)); 
    dispatch(calculatePrice());
  }

  return (
    <div className="number-input">
      <button 
        className="button button--square" 
        onClick={handleDecrement} 
        disabled={value === 1}
      >
        <ChevronLeftIcon />
      </button>
      
      <input 
        type="number"
        value={value}
        onChange={handleChange}
        className="number-input__input"
        min={1}
        required
      />
     
      <button 
        className="button button--square" 
        onClick={handleIncrement}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
