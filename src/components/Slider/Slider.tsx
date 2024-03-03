import React, { useState, useEffect, useRef } from 'react';
import './Slider.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { ExpandIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';
import { Popup } from '../Popup/Popup';

interface SliderProps {
  images: string[];
}

export const Slider: React.FC<SliderProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // popup
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.popup.isOpen);

  const handleOpen = () => {
    dispatch(openPopup());
  };

  // main image buttons
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // click on thumbnail
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index % images.length);
  };

  // click on thumbnails prev button
  const handleThumbnailPrev = () => {
    let newIndex = activeThumbnailIndex - 1;
    if (newIndex < 0) {
      newIndex = images.length - 1; // Loop to the last thumbnail
    }
    setActiveThumbnailIndex(newIndex);
    smoothScrollToThumbnail(newIndex);
  };
  
  // click on thumbnails next button
  const handleThumbnailNext = () => {
    let newIndex = activeThumbnailIndex + 1;
    if (newIndex >= images.length) {
      newIndex = 0; // Loop to the first thumbnail
    }
    setActiveThumbnailIndex(newIndex);
    smoothScrollToThumbnail(newIndex);
  };

  const smoothScrollToThumbnail = (index: number) => {
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[index] as HTMLElement;
      if (thumbnail) {
        const container = thumbnailsRef.current;
        const scrollLeft = thumbnail.offsetLeft - (container.offsetWidth - thumbnail.offsetWidth) / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const scrollToActiveThumbnail = () => {
      if (thumbnailsRef.current) {
        const container = thumbnailsRef.current;
        const thumbnailWidth = container.children[0]?.clientWidth || 0;
        const scrollAmount = thumbnailWidth;
        container.scrollLeft = activeThumbnailIndex * scrollAmount;
      }
    };

    if (thumbnailsRef.current) {
      scrollToActiveThumbnail();
    }
  }, [activeThumbnailIndex]);

  return (
    <div className="slider">
      <div className="slider__main">
        <div className="slider__image-container">
          <img src={`${process.env.PUBLIC_URL}/img/${images[activeIndex]}`} alt="" className="slider__main-image" />

          <div className="slider__image-counter">{activeIndex + 1}/{images.length}</div>

          <div className="slider__expand">
            <button className="button button--square" onClick={handleOpen}>
              <ExpandIcon />
            </button>
          </div>

          {isOpen && (
            <Popup image={images[activeIndex]} />
          )}
        </div>

        <div className="slider__buttons-main">
          <button className="button button--square" onClick={handlePrev}>
            <ChevronLeftIcon />
          </button>
          <button className="button button--square" onClick={handleNext}>
            <ChevronRightIcon />
          </button>
        </div>
        <div className="slider__note">
          Picture shows conveyor with optional structures and features
        </div>
      </div>

      <div className="slider__thumbnails-wrap">
        <button 
          className="button button--square" 
          onClick={handleThumbnailPrev}
        >
          <ChevronLeftIcon />
        </button>

        <div className="slider__thumbnails" ref={thumbnailsRef}>
          {images.map((image, index) => (
            <div className="slider__thumbnail-wrap" key={index}>
              <img
                src={`${process.env.PUBLIC_URL}/img/${image}`}
                alt=""
                className="slider__thumbnail"
                onClick={() => handleThumbnailClick(index)}
              />
            </div>
          ))}

          {/* Repeat the thumbnails to create a loop */}
          {images.map((image, index) => (
            <div className="slider__thumbnail-wrap" key={index + images.length}>
              <img
                src={`${process.env.PUBLIC_URL}/img/${image}`}
                alt=""
                className="slider__thumbnail"
                onClick={() => handleThumbnailClick(index + images.length)}
              />
            </div>
          ))}
        </div>

        <button 
          className="button button--square" 
          onClick={handleThumbnailNext}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};
