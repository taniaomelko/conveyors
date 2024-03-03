import React from 'react';
import './Counter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setConveyorFormData } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { MinusIcon, PlusIcon } from '../icons';

export const Counter: React.FC = ( ) => {
  const dispatch = useDispatch();
  const conveyorData = useSelector((state: RootState) => state.conveyorFormData);
  const quantity = useSelector((state: RootState) => state.conveyorFormData.quantity);

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updatedData = { ...conveyorData, quantity: quantity + 1 }    
    dispatch(setConveyorFormData(updatedData));
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const updatedData = { ...conveyorData, quantity: quantity - 1 }; 
    dispatch(setConveyorFormData(updatedData)); 
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {    
    const updatedValue = Math.max(parseInt(event.target.value, 10), 1);
    const updatedData = { ...conveyorData, quantity: updatedValue }; 
    dispatch(setConveyorFormData(updatedData)); 
  }

  return (
    <div className="counter">
      <button 
        className="button button--square" 
        onClick={handleDecrement} 
        disabled={quantity === 1}
      >
        <MinusIcon />
      </button>

      <input 
        type="number"
        value={quantity}
        onChange={handleChange}
        className="counter__value"
        min={1}
        required
      />
     
      <button 
        className="button button--square" 
        onClick={handleIncrement}
      >
        <PlusIcon />
      </button>
    </div>
  );
};
