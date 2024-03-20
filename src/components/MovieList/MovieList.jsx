import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map(({ id, title }) => {
        return (
          <li key={id}>
            <Link to={`/movie/${id}`}>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
