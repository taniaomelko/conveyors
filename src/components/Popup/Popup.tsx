import React, { useEffect } from 'react';
import './Popup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { CloseIcon } from '../icons';

interface PopupProps {
  image: string;
}

export const Popup: React.FC<PopupProps> = ({ image }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.popup.isOpen);

  const handleClose = () => {
    if (isOpen) { 
      dispatch(closePopup());
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(closePopup());
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="popup">
      <div className="popup__content">
        <img src={`${process.env.PUBLIC_URL}/img/${image}`} alt="Main" className="popup__image" />
        <button className="popup__close-button" onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
      <div className="popup__bg" onClick={handleClose}></div>
    </div>
  );
};
