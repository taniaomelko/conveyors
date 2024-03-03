import React, { useState, useEffect } from 'react';
import './RadioInput.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setConveyorFormData, calculatePrice } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { NumberInput } from '../NumberInput/NumberInput';
import { initialState } from '../../redux/reducers/conveyorFormData';
import { IWidth } from '../../types/IWidth';
import { IConveyorFormData } from '../../types/IConveyorFormData';

interface RadioInputProps {
  widthData: IWidth[]; 
}

export const RadioInput: React.FC<RadioInputProps> = ({ widthData }) => {
  const [activeWidth, setActiveWidth] = useState<number | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const dispatch = useDispatch();
  const conveyorData = useSelector((state: RootState) => state.conveyorFormData);

  const handleWidthClick = (width: number) => {
    setActiveWidth(width);
    setShowCustomInput(false);
    const updatedData = { ...conveyorData, width };
    updateData(updatedData);
  };

  const handleCustomWidthInput = () => {
    setActiveWidth(null);
    setShowCustomInput(true);
    if (!showCustomInput) {
      const updatedData = { ...conveyorData, width: 1 };
      updateData(updatedData);
    }
  }

const updateData = (value: IConveyorFormData) => {  
  dispatch(setConveyorFormData(value)); 
  dispatch(calculatePrice());
}

  useEffect(() => {
    if (conveyorData === initialState) {
      setActiveWidth(null);
      setShowCustomInput(false);
    }
  }, [conveyorData]);

  return (
    <div className="radio-input">
      <div className="radio-input__items">
        {widthData.map((width: IWidth) => {
          const { value, available } = width;
          return (
            <label 
              htmlFor={`width-${value}`} 
              key={value} 
              className={`radio-input__item
                ${activeWidth === value ? 'active' : ''} 
                ${!value ? 'disabled' : ''}`} 
            >
              {value}”
              <input 
                type="radio" 
                name="width" 
                id={`width-${value}`}
                value={value}
                disabled={!available}
                onChange={() => handleWidthClick(value)}
              />
            </label>
          );
        })}

        <div 
          className={`radio-input__item ${showCustomInput ? 'active' : ''}`} 
          onClick={handleCustomWidthInput}
        >
          Custom
        </div>
      </div>

      {showCustomInput && (
        <div className="radio-input__number-input">
          <NumberInput name="width" />
        </div>
      )}
    </div>
  );
};
