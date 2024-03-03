import './Price.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

export const Price = () => {
  const price = useSelector((state: RootState) => state.conveyorFormData.price);

  return (
    <>
      <div className="price">
        <span>{'from '}</span>
        <big>${price}</big>
        <small>{' ea '}</small>
        <big>{'*'}</big>
      </div>

      <div className="price__note">
      *Final price is defined after a consultation with our specialist due to conveyor specifics of use.
      </div>
    </>
  );
}
