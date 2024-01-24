import Modal from "./components/Modal";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import Sorting from "./components/Sorting";
import useMovieSearch from "./hooks/useMovieSearch";
import { selectError, selectIsLoading, selectMovies } from "./redux/movieSlice";
import { useAppSelector } from "./redux/store";

const App = () => {
  const movies = useAppSelector(selectMovies);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const { selectedMovie, totalPages } = useMovieSearch();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Movies Searcher</h1>
      <SearchBar />
      {isLoading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      <MovieList />

      {movies.length > 0 && totalPages > 0 && <Pagination />}

      {movies.length > 0 && <Sorting />}

      <Modal>{selectedMovie ? <MovieDetail /> : <p>Chargement...</p>}</Modal>
    </div>
  );
};

export default App;
