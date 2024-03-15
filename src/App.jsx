import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import {
  fetchTranding,
  fetchMovieById,
  searchMovie,
  fetchCreditsById,
  fetchReviewsById,
} from "../movie-api";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MovieList from "./components/MovieList/MovieList";
const Error = lazy(() => import("./components/Error/Error"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const Loader = lazy(() => import("./components/Loader/Loader"));
const MovieCredits = lazy(() =>
  import("./components/MovieCredits/MovieCredits")
);
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
  const [tranding, setTranding] = useState([]);
  const [choosedMovie, setChoosedMovie] = useState([]);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getTranding = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchTranding();
        setTranding(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getTranding();
  }, []);

  const handleForwardClick = async (id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const data = await fetchMovieById(id);
      return setChoosedMovie(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCredits = async (id) => {
    if (credits.length > 0) return;

    try {
      setIsError(false);
      setIsLoading(true);
      const response = await fetchCreditsById(id);
      setCredits(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async (id) => {
    if (reviews.length > 0) return;

    try {
      setIsError(false);
      setIsLoading(true);
      const response = await fetchReviewsById(id);
      setReviews(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const findMovie = async (query) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await searchMovie(query);
      setFoundedMovies(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // const { movieId } = useParams();
  return (
    <div>
      <Toaster />
      <Navigation />
      {isLoading && <Loader />}
      {isError && <Error />}

      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage onClick={handleForwardClick} movies={tranding} />
            }
          />
          <Route
            path="/movie"
            element={
              <MoviesPage
                onSearch={findMovie}
                movies={foundedMovies}
                onClick={handleForwardClick}
              />
            }
          />
          <Route
            path={`/movie/:movieId`}
            element={
              <MovieDetailsPage
                movie={choosedMovie}
                onClickCredits={fetchCredits}
                onClickReviews={fetchReviews}
              />
            }
          >
            <Route
              path="credits"
              element={<MovieCredits credits={credits} />}
            />

            <Route
              path="reviews"
              element={<MovieReviews reviews={reviews} />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
