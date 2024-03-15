import SearchField from "../../components/SearchField/SearchField";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = ({ onSearch, movies, onClick }) => {
  return (
    <div>
      <SearchField onSearch={onSearch} />
      <MovieList movies={movies} onClick={onClick} />
    </div>
  );
};

export default MoviesPage;
