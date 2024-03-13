import { Link } from "react-router-dom";

const TrandingsToday = ({ movies, onClick }) => {
  return (
    <div>
      <h1>Tranding Movies</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link
                onClick={() => {
                  onClick(movie.id);
                }}
                to={`/movie/${movie.id}`}
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TrandingsToday;
