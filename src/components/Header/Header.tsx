import './Header.scss';
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/conveyors">Conveyors</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
