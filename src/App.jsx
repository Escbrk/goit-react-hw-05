import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
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
  return (
    <div>
      <Toaster />
      <Navigation />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<MoviesPage />} />
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
