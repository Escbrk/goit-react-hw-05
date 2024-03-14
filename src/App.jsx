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
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import Loader from "./components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import Error from "./components/Error/Error";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
            element={<MoviesPage onSearch={searchMovie} />}
          />
          <Route
            path={`/movie/:movieId`}
            element={
              <MovieDetailsPage
                movie={choosedMovie}
                onClickCredits={fetchCreditsById}
                onClickReviews={fetchReviewsById}
              />
            }
          >
            <Route
              path="credits"
              element={<MovieCredits onClick={fetchCreditsById} />}
            />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
