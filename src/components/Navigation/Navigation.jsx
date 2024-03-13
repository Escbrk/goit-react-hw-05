import { NavLink } from "react-router-dom";
import "./Navigation.module.css";
import clsx from "clsx";

const activeLink = ({ isActive }) => {
  return clsx()
}

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>

      {/* <NavLink>Movies</NavLink> */}
    </nav>
  );
};

export default Navigation;
