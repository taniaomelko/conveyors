import { FormEvent, useState, useEffect } from 'react';
import './Conveyor.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConveyorsAction, setConveyorFormData, resetConveyorFormData, calculatePrice } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../data/api';
import { InfoTitle } from '../InfoTitle/InfoTitle';
import { NumberInput } from '../NumberInput/NumberInput';
import { Select } from '../Select/Select';
import { Counter } from '../Counter/Counter';
import { Slider } from '../Slider/Slider';
import { RadioInput } from '../RadioInput/RadioInput';
import { Rating } from '../Rating/Rating';
import { Price } from '../Price/Price';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { CheckIcon, FlagIcon } from '../icons';
import { useChosenConveyor } from '../../scripts/scripts';

export const Conveyor = () => {
  const dispatch = useDispatch();
  const conveyorData = useSelector((state: RootState) => state.conveyorFormData);
  const navigate = useNavigate();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      dispatch(fetchConveyorsAction(data));
    };

    fetchData();
  }, [dispatch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setConveyorFormData({ ...conveyorData, SKU }));
    dispatch(resetConveyorFormData());
    navigate("/thank-you");
  };

  const chosenConveyor = useChosenConveyor();
  if (!chosenConveyor) {
    return (
      <section className="conveyor">
        <div className="container">
          <div className="">No conveyor</div>
        </div>
      </section>
    );
  }

  const { title, images, width, options, SKU, uponRequest, rating } = chosenConveyor;

  return (
    <section className="conveyor">
      <div className="conveyor__navigation">
        <Breadcrumbs />
      </div>

      <div className="container">
        <div className="conveyor__wrapper">
          <h1 className="conveyor__title">
            {title}
          </h1>

          <div className="conveyor__slider">
            <Slider images={images} />
          </div>

          <form 
            action="" 
            className="conveyor__form" 
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <div className="conveyor__part">
                <InfoTitle 
                  title="Conveyor Belt Width, in" 
                  text="Flexible gravity roller conveyors are ideal for maneuvering into places that are not suited for conventional conveyor systems." 
                />

                <RadioInput widthData={width} />
              </div>

              <div className="conveyor__part">
                <InfoTitle 
                  title="Bed Section Length, in" 
                  text="Determines the linear span for material transport, critical for adapting conveyor systems to diverse environments and load sizes." 
                />

                <div className="conveyor__number-input">
                  <NumberInput name="length" />
                </div>
              </div>

              <div className="conveyor__part">
                <div className="conveyor__select-title">
                  <InfoTitle 
                    title="Additional options"
                    text="Enhance conveyor functionality with customizable features to meet specific operational needs."
                  />
                </div>

                <Select options={options} />
              </div>
            </div>

            <div className="conveyor__info">
              <div className="conveyor__info-top">
                <div className="conveyor__info-sku">
                  <span>SKU: </span> 
                  {SKU}
                </div>

                <div className="conveyor__info-labels">
                  {uponRequest && (
                    <div className="conveyor__info-request">
                      <CheckIcon />
                      Upon request
                    </div>
                  )}

                  <div className="conveyors__info-rating">
                    <Rating rating={rating} />
                  </div>
                </div>
              </div>

              <div className="conveyor__info-bottom">
                <Price />

                <div className="conveyor__counter">
                  <Counter />
                </div>

                <div 
                  className="conveyor__submit" 
                  onMouseEnter={() => setShowHint(true)}
                  onMouseLeave={() => setShowHint(false)}
                >
                  <button 
                    type="submit" 
                    className="button button--cta"
                    disabled={!(conveyorData.width)}
                  >
                    <FlagIcon />
                    Request
                  </button>

                  {showHint && !conveyorData.width && (
                    <div className="conveyor__submit-hint">
                      Select Conveyor Belt Width, please.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
