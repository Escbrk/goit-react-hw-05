import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { getMovie, getCreditsById, getReviewsById } from "../movie-api";
import { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import MovieList from "./components/MovieList/MovieList";
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
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const findMovie = async (query) => {
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

  return (
    <div>
      <Toaster />
      <Navigation />
      {isLoading && <Loader />}
      {isError && <Error />}

      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movie"
            element={
              <MoviesPage
                onSearch={findMovie}
                movies={foundedMovies}
              />
            }
          />
          <Route path={`/movie/:movieId`} element={<MovieDetailsPage />}>
            <Route path="credits" element={<MovieCredits />} />

            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
