import { useEffect } from 'react';
import './ConveyorsList.scss';
import { getData } from '../../data/api';
import { IConveyor } from '../../types/IConveyor';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchConveyorsAction, setChosenConveyor } from '../../redux/actions';
import { RootState } from '../../redux/reducers';

export const ConveyorsList = () => {
  const dispatch = useDispatch();
  const allConveyors = useSelector((state: RootState) => state.conveyors.allConveyors);

  const handleLinkClick = (conveyor: IConveyor) => {
    dispatch(setChosenConveyor(conveyor.id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      dispatch(fetchConveyorsAction(data));
    };

    fetchData();
  }, [dispatch]);

  return (
    <section className="conveyors-list">
      <div className="container">
        <h1 className="conveyors-list__title">
          Conveyors:
        </h1>
        {allConveyors.map(conveyor => {
          const { slug, id, title } = conveyor;
          return (
            <Link to={`/conveyors/${slug}`} key={id}>
              <h3 className="conveyors-list__item-title" onClick={() => handleLinkClick(conveyor)}>
                {title}
              </h3>
            </Link>
          )
        })}
      </div>
    </section>
  );
}
