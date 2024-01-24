import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Movie } from "../types/movie";
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGINATION_WINDOW,
  DEFAULT_SORT_BY,
  DEFAULT_TOTAL_PAGES,
} from "../constants/constants";

interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  isLoading: boolean;
  error: string;
  sortBy: "year" | "title";
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  searchTerm: string;
  paginationWindow: [number, number];
  isModalOpen: boolean;
  selectIsButtonDisabled: boolean;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  isLoading: false,
  error: "",
  sortBy: DEFAULT_SORT_BY,
  currentPage: DEFAULT_CURRENT_PAGE,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  totalPages: DEFAULT_TOTAL_PAGES,
  searchTerm: "",
  paginationWindow: DEFAULT_PAGINATION_WINDOW,
  isModalOpen: false,
  selectIsButtonDisabled: true,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSortBy: (state, action: PayloadAction<"year" | "title">) => {
      state.sortBy = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPaginationWindow: (state, action: PayloadAction<[number, number]>) => {
      state.paginationWindow = action.payload;
    },
    setIsButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.selectIsButtonDisabled = action.payload;
    },

    goToNextPageSet: (state) => {
      const end = state.paginationWindow[1];
      const newStart = Math.min(end + 1, state.totalPages);
      const newEnd = Math.min(newStart + 4, state.totalPages);
      state.paginationWindow = [newStart, newEnd];
    },
    goToPreviousPageSet: (state) => {
      const start = state.paginationWindow[0];
      const newEnd = Math.max(start - 1, 1);
      const newStart = Math.max(newEnd - 4, 1);
      state.paginationWindow = [newStart, newEnd];
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  setMovies,
  setSelectedMovie,
  setIsLoading,
  setError,
  setSortBy,
  setCurrentPage,
  setTotalPages,
  setSearchTerm,
  setPaginationWindow,
  setIsModalOpen,
  goToNextPageSet,
  goToPreviousPageSet,
  setIsButtonDisabled,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectSelectedMovie = (state: RootState) =>
  state.movies.selectedMovie;
export const selectIsLoading = (state: RootState) => state.movies.isLoading;
export const selectError = (state: RootState) => state.movies.error;
export const selectCurrentPage = (state: RootState) => state.movies.currentPage;
export const selectTotalPages = (state: RootState) => state.movies.totalPages;
export const selectSortBy = (state: RootState) => state.movies.sortBy;
export const selectSearchTerm = (state: RootState) => state.movies.searchTerm;
export const selectPaginationWindow = (state: RootState) =>
  state.movies.paginationWindow;
export const selectIsModalOpen = (state: RootState) => state.movies.isModalOpen;
export const selectIsButtonDisabled = (state: RootState) =>
  state.movies.selectIsButtonDisabled;
