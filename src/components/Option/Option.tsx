import React, { useState, useEffect } from 'react';
import './Option.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setConveyorFormData, calculatePrice } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { InfoTitle } from '../InfoTitle/InfoTitle';
import { initialState } from '../../redux/reducers/conveyorFormData';
import { CheckIcon } from '../icons';
import { IOption } from '../../types/IOption';

interface OptionProps {
  option: IOption,
}

export const Option: React.FC<OptionProps> = ({ option }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const conveyorData = useSelector((state: RootState) => state.conveyorFormData);
  const options = useSelector((state: RootState) => state.conveyorFormData.options);

  const { title, info } = option;  

  const handleCheckboxChange = () => {
    setIsChecked(prevState => !prevState);

    const updatedOptions = isChecked
      ? options.filter((opt: string) => opt !== title) // Remove the option if it's already checked
      : [...options, title]; // Add the option if it's not checked

    const updatedData = { ...conveyorData, options: updatedOptions };
    dispatch(setConveyorFormData(updatedData));
    dispatch(calculatePrice());
  };

  useEffect(() => {
    if (conveyorData === initialState) {
      setIsChecked(false);
    }
  }, [conveyorData]);

  return (
    <div className={`option ${isChecked ? 'checked' : ''}`}>
      <label className="option__label">
        <input
          type="checkbox"
          name={title}
          value={title}
          className="option__input"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="option__checkbox">
          <div className="option__checkbox-icon">
            <CheckIcon /> 
          </div>
        </div>
        <div className="option__text">{title}</div>
        <div className="option__info-icon">
          <InfoTitle title="" text={info} />
        </div>
      </label>
    </div>
  );
};
