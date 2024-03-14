import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const activeLink = ({ isActive }) => {
  return clsx(isActive && css.active);
};

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" className={activeLink}>
        Home
      </NavLink>

      <NavLink to="/movie" className={activeLink}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
