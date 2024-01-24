import { useCallback } from "react";

import {
  setMovies,
  setSelectedMovie,
  setIsLoading,
  setError,
  setCurrentPage,
  setTotalPages,
  setSortBy,
  setSearchTerm,
  setPaginationWindow,
  selectMovies,
  selectSelectedMovie,
  selectIsLoading,
  selectError,
  selectCurrentPage,
  selectTotalPages,
  selectSortBy,
  selectSearchTerm,
  selectPaginationWindow,
  selectIsModalOpen,
  setIsModalOpen,
} from "../redux/movieSlice";

import { searchMoviesByTitle, getMovieDetailsById } from "../api/omdbApi";
import { Movie } from "../types/movie";
import { useAppDispatch, useAppSelector } from "../redux/store";

const useMovieSearch = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const selectedMovie = useAppSelector(selectSelectedMovie);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const sortBy = useAppSelector(selectSortBy);
  if (typeof sortBy !== "string") {
    console.error("sortBy n'est pas un string", sortBy);
  }
  const searchTerm = useAppSelector(selectSearchTerm);
  const paginationWindow = useAppSelector(selectPaginationWindow);

  const handleSearch = useCallback(
    async (term: string, page: number = 1) => {
      dispatch(setIsLoading(true));
      dispatch(setError(""));
      dispatch(setSearchTerm(term));
      dispatch(setCurrentPage(page));
      dispatch(setMovies([]));

      try {
        const result = await searchMoviesByTitle(term, page);
        if (result.Response === "True") {
          dispatch(setTotalPages(Math.ceil(result.totalResults / 10)));
          dispatch(setMovies(result.Search));
        } else {
          dispatch(setError(result.Error));
        }
      } catch (err) {
        dispatch(setError("Une erreur lors de la recherche d'un film"));
      }

      dispatch(setIsLoading(false));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      dispatch(setCurrentPage(pageNumber));
      handleSearch(searchTerm, pageNumber);
    },
    [dispatch, searchTerm, handleSearch]
  );

  const handleSelectMovie = useCallback(
    async (id: string) => {
      dispatch(setIsLoading(true));
      dispatch(setError(""));
      dispatch(setIsModalOpen(true));
      dispatch(setSelectedMovie(null));

      try {
        const movieDetails = await getMovieDetailsById(id);
        if (movieDetails.Response === "True") {
          dispatch(setSelectedMovie(movieDetails));
        } else {
          dispatch(setError(movieDetails.Error));
        }
      } catch (err) {
        dispatch(setError("An error occurred while fetching movie details."));
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === "year" || newSortBy === "title") {
      dispatch(setSortBy(newSortBy));
      const sortedMovies = sortMovies(movies, newSortBy);
      dispatch(setMovies(sortedMovies));
    } else {
      console.error("Invalid sort by value: ", newSortBy);
    }
  };

  const sortMovies = (movies: Movie[], sortBy: "year" | "title"): Movie[] => {
    const sortedMovies = [...movies];

    if (sortBy === "year") {
      sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    } else if (sortBy === "title") {
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    }

    return sortedMovies;
  };

  const goToNextPageSet = () => {
    const newStart = Math.min(paginationWindow[1] + 1, totalPages);
    const newEnd = Math.min(newStart + 4, totalPages);
    dispatch(setPaginationWindow([newStart, newEnd]));
  };

  const goToPreviousPageSet = () => {
    const newEnd = Math.max(paginationWindow[0] - 1, 1);
    const newStart = Math.max(newEnd - 4, 1);
    dispatch(setPaginationWindow([newStart, newEnd]));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
  };

  return {
    movies,
    selectedMovie,
    isLoading,
    error,
    isModalOpen,
    totalPages,
    currentPage,
    paginationWindow,
    handleSearch,
    handlePageChange,
    handleSelectMovie,
    handleSortChange,
    handleCloseModal,
    setIsModalOpen,
    goToNextPageSet,
    goToPreviousPageSet,
  };
};

export default useMovieSearch;
