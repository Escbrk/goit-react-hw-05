import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import "./MovieDetailsPage.module.css";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { getMovieById } from "../../../movie-api";
const Error = lazy(() => import("../../components/Error/Error"));
const Loader = lazy(() => import("../../components/Loader/Loader"));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieInfo, serMovieInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");
  console.log(backLinkRef.current);

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
      <Link to={backLinkRef.current}>⬅️Go Back</Link>
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
          <ul style={{ padding: 0 }}>
            {genres &&
              genres.map(({ id, name }) => {
                return (
                  <li key={id} style={{ display: "inline-block" }}>
                    {name}
                    &nbsp;
                  </li>
                );
              })}
          </ul>
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
