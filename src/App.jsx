import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { fetchTranding, fetchMovieById } from "../movie-api";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
const TrandingsToday = lazy(() =>
  import("./components/TrandingsToday/TrandingsToday")
);
const MoviePage = lazy(() => import("./pages/MoviePage/MoviePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
  const [tranding, setTranding] = useState([]);
  const [choosedMovie, setChoosedMovie] = useState([]);

  useEffect(() => {
    const getTranding = async () => {
      try {
        const data = await fetchTranding();
        setTranding(data);
      } catch (error) {
        //
      } finally {
        //
      }
    };
    getTranding();
  }, []);

  const handleForwardClick = async (id) => {
    try {
      const data = await fetchMovieById(id);
      return setChoosedMovie(data);
    } catch (error) {
      //
    } finally {
      //
    }
  };

  return (
    <div>
      <Navigation />

      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <TrandingsToday onClick={handleForwardClick} movies={tranding} />
            }
          />
          <Route
            path={`/movie/:movieId`}
            element={<MoviePage movie={choosedMovie} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
