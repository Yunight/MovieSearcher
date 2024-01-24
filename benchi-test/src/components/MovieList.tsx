import useMovieSearch from "../hooks/useMovieSearch";
import { selectMovies } from "../redux/movieSlice";
import { memo } from "react";
import { useAppSelector } from "../redux/store";

const MovieList = () => {
  const { handleSelectMovie } = useMovieSearch();
  const movies = useAppSelector(selectMovies);
  if (movies.length === 0) return null;

  return (
    <ul className="border border-gray-300 rounded p-4 m-4 divide-y divide-gray-300 ">
      {movies.map((movie) => (
        <li
          className="cursor-pointer p-2 hover:bg-gray-100"
          key={movie.imdbID}
          onClick={() => handleSelectMovie(movie.imdbID)}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {movie.Title}
              </p>
              <p className="text-sm text-gray-500 truncate">{movie.Year}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const MemoizedMovieList = memo(MovieList);
export default MemoizedMovieList;
