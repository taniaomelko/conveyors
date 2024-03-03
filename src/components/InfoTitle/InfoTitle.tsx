import React, { useState } from 'react';
import './InfoTitle.scss';
import { InfoIcon } from '../icons';

interface InfoTitleProps {
  title?: string;
  text: string;
}

export const InfoTitle: React.FC<InfoTitleProps> = ({ title, text }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <div className="info-title">
      {title && (
        <h3 className="info-title__title">
          {title}
        </h3>
      )}
      <div 
        className="info-title__icon" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <InfoIcon />
        {showInfo && (
          <div className="info-title__text-wrap">
            <div className="info-title__text">
              {text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
