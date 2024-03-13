import { Link } from "react-router-dom";
import "./MoviePage.module.css";

const MoviePage = ({
  movie: { id, title, overview, genres, vote_average, poster_path },
}) => {
  return (
    <div>
      <Link to={'/'}>⬅️Go Back</Link>
      <img
        src={`https://image.tmdb.org/t/p/w300${poster_path}`}
        alt={overview}
      />
      <h2>{title}</h2>
      <p>User Score: {vote_average}</p>
      <b>Overview</b>
      <p>{overview}</p>
      <b>Genres</b>
      {/* {genres.map((genre) => {
        return <p key={id}>{genre.name}</p>;
      })} */}
          <hr />
          <p>Additional information:</p>
    </div>
  );
};

export default MoviePage;
