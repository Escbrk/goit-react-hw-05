import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <br />
      <Link>Movies</Link>
    </nav>
  );
};

export default Navigation;
