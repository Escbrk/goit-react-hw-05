import { Link } from "react-router-dom";

const MovieList = ({ movies, onClick }) => {
  return (
    <ul>
      {movies.map(({ id, title }) => {
        return (
          <li key={id}>
            <Link
              onClick={() => {
                onClick(id);
              }}
              to={`/movie/${id}`}
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
