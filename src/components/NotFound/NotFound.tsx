import React from 'react';
import './NotFound.scss';

export const NotFound: React.FC = () => {
  return (
    <section className="not-found">
      <div className="container">
        <h1 className="not-found__title">
          404 - Not Found
        </h1>
        <div className="not-found__description">
          Sorry, the page you are looking for does not exist.
        </div>
      </div>
    </section>
  );
};
