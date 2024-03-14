import { Link, NavLink, Outlet } from "react-router-dom";
import "./MovieDetailsPage.module.css";
import { Suspense } from "react";

const MovieDetailsPage = ({
  movie: { id, title, overview, genres, vote_average, poster_path },
  onClickCredits,
  onClickReviews,
}) => {
  console.log(id);
  return (
    <div>
      <Link to={"/"}>⬅️Go Back</Link>
      <img
        src={`https://image.tmdb.org/t/p/w300${poster_path}`}
        alt={overview}
      />
      <h2>{title}</h2>
      <p>User Score: {vote_average}</p>
      <b>Overview</b>
      <p>{overview}</p>
      <b>Genres</b>
      {genres &&
        genres.map((genre) => {
          return <p key={genre.id}>{genre.name}</p>;
        })}
      <hr />
      <p>Additional information:</p>
      <ul>
        <li>
          <NavLink
            to={"credits"}
            onClick={() => {
              onClickCredits(id);
            }}
          >
            Credits
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"reviews"}
            onClick={() => {
              onClickReviews(id);
            }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
