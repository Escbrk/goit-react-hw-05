import { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCreditsById } from "../../../movie-api";
const Error = lazy(() => import("../../components/Error/Error"));
const Loader = lazy(() => import("../../components/Loader/Loader"));

const MovieCredits = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchCredits = async (id) => {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await getCreditsById(id);
        setCredits(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCredits(movieId);
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Error />}
      <br />
      <ul>
        {!isLoading &&
          credits &&
          credits.map(({ id, profile_path, name, character }) => {
            return (
              <li key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                  alt=""
                />
                <h3>{name}</h3>
                <p>{character}</p>
                <hr />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MovieCredits;
