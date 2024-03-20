import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrending } from "../../../movie-api";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [tranding, setTranding] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getTranding = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getTrending();
        setTranding(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getTranding();
  }, []);

  return (
    <div>
      <h1>Tranding Movies</h1>
      {isLoading && <Loader />}
      {isError && <Error />}
      {!isLoading && <MovieList movies={tranding} />}
    </div>
  );
};

export default HomePage;
