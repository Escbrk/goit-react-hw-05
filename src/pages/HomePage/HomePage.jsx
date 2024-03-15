import MovieList from "../../components/MovieList/MovieList";

const HomePage = ({ movies, onClick }) => {
  return (
    <div>
      <h1>Tranding Movies</h1>
      <MovieList movies={movies} onClick={onClick} />
    </div>
  );
};

export default HomePage;
