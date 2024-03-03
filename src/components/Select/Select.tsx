import React, { useState, useEffect, useRef } from 'react';
import './Select.scss';
import { ChevronDownIcon } from '../icons';
import { Option } from '../Option/Option';
import { IOption } from '../../types/IOption';

interface NumberInputProps {
  options: IOption[],
}

export const Select: React.FC<NumberInputProps> = ({ options }) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!selectGroupRef.current?.contains(target) && !target.classList.contains('open')) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="select">
      <div className={`select__select-wrap ${showOptions ? 'open' : ''}`} onClick={() => setShowOptions(!showOptions)}>
        <div className="select__select">Select options</div>
        <div className="select__icon">
          <ChevronDownIcon />
        </div>
      </div>
      <div className={`select__group ${showOptions ? 'visible' : ''}`} ref={selectGroupRef}>
        <div className="select__options-wrap">
          {options.map((option: IOption, index: number) => (
            <Option key={index} option={option} />
          ))}
        </div>
      </div>
    </div>
  );
};
