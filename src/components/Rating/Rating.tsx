import React from 'react';
import './Rating.scss';
import { StarIcon, ChevronRightIcon } from '../icons';
import { IRating } from '../../types/IRating';

export interface RatingProps {
  rating: IRating,
}

export const Rating: React.FC<RatingProps> = ({ rating }) => {
  const { grade, quantity } = rating;

  // check if grade is valid
  if (grade < 0 || grade > 5) {
    return null;
  }

  return (
    <div className="rating">
      <div className="rating__wrap">
        <div className="rating__stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`rating__star ${grade >= index + 1 ? 'filled' : ''}`}
            >
              <StarIcon />
            </span>
          ))}
        </div>

        <div className="rating__quantity">({quantity})</div>
      </div>

      <div className="rating__read">
        <a href="/" className="rating__read-text">Read</a>
        <ChevronRightIcon />
      </div>
    </div>
  );

};
