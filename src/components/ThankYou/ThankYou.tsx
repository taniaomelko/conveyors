import React from 'react';
import './ThankYou.scss';
import { ArrowLeftIcon } from '../icons';
import { Link } from "react-router-dom";

export const ThankYou: React.FC = () => {
  return (
    <section className="thank-you">
      <div className="container">
        <Link to="/" className="thank-you__back">
          <ArrowLeftIcon />
          Back home
        </Link>
        <div className="thank-you__title-wrap">
          <h1 className="thank-you__title">Thank you!</h1>
        </div>
      </div>
    </section>
  );
};
