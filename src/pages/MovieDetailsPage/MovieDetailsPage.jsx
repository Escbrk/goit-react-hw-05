import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import "./MovieDetailsPage.module.css";
import { Suspense, useEffect, useState } from "react";
import { getMovieById } from "../../../movie-api";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieInfo, serMovieInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { title, overview, genres, vote_average, poster_path } = movieInfo;

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getMovieById(movieId);
        serMovieInfo(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div>
      <Link to={"/"}>⬅️Go Back</Link>
      <br />
      {isLoading && <Loader />}
      {isError && <Error />}

      {!isLoading && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={overview}
          />
          <h2>{title}</h2>
          <p>User Score: {vote_average}</p>
          <b>Overview:</b>
          <p>{overview}</p>
          <b>Genres:</b>
          <div>
            {genres &&
              genres.map(({ id, name }) => {
                return (
                  <>
                    <span key={id}>{name}</span>&nbsp;
                  </>
                );
              })}
          </div>
          <hr />
          <p>Additional information:</p>
          <ul>
            <li>
              <NavLink to={"credits"}>Credits</NavLink>
            </li>
            <li>
              <NavLink to={"reviews"}>Reviews</NavLink>
            </li>
          </ul>
          <Suspense>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
