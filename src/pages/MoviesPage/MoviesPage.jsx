import SearchField from "../../components/SearchField/SearchField";
import MovieList from "../../components/MovieList/MovieList";
import { lazy, useEffect, useState } from "react";
import { getMovie } from "../../../movie-api";
import { useSearchParams } from "react-router-dom";
const Error = lazy(() => import("../../components/Error/Error"));
const Loader = lazy(() => import("../../components/Loader/Loader"));

const MoviesPage = () => {
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [params, setParams] = useSearchParams();
  console.log(params.get("query"));

  const findMovie = async (query) => {
    console.log(query);
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await getMovie(query);
      setFoundedMovies(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const findMovie = async (query) => {
  //     console.log(query);
  //     try {
  //       setIsError(false);
  //       setIsLoading(true);
  //       params.set("query", query);
  //       setParams(params);
  //       const response = await getMovie(query);
  //       setFoundedMovies(response);
  //     } catch (error) {
  //       setIsError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   findMovie(params.get("query") ?? "");
  // }, [params]);

  return (
    <div>
      <SearchField onSearch={findMovie} />
      {isLoading && <Loader />}
      {isError && <Error />}
      {!isLoading && <MovieList movies={foundedMovies} />}
    </div>
  );
};

export default MoviesPage;
