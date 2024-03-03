import './Breadcrumbs.scss';
import { useChosenConveyor } from '../../scripts/scripts';
import { ArrowRightLongIcon } from "../icons";
import { Link } from 'react-router-dom';

export const Breadcrumbs = () => { 
  const chosenConveyor = useChosenConveyor();

  return (
    <nav className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to="/">Home</Link>
          </li>

          <ArrowRightLongIcon />
          <li className="breadcrumbs__item">
            <Link to="/conveyors">Conveyors</Link>
          </li>

          {chosenConveyor && (
            <>
              <ArrowRightLongIcon />
              <li className="breadcrumbs__item">
                <span>
                  {chosenConveyor.title}
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
