import React, { memo, useEffect, useRef } from "react";

import { setIsButtonDisabled, setSearchTerm } from "../redux/movieSlice";
import { selectSearchTerm, selectIsButtonDisabled } from "../redux/movieSlice";
import useMovieSearch from "../hooks/useMovieSearch";
import { useAppDispatch, useAppSelector } from "../redux/store";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);
  const isButtonDisabled = useAppSelector(selectIsButtonDisabled);
  const { handleSearch } = useMovieSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.length > 0
      ? dispatch(setIsButtonDisabled(false))
      : dispatch(setIsButtonDisabled(true));

    dispatch(setSearchTerm(value));
  };

  const handleSearchMovies = () => {
    if (!isButtonDisabled) {
      handleSearch(searchTerm);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center border rounded-full px-4 py-2 m-5">
      <input
        type="text"
        ref={inputRef}
        placeholder="Rechercher des films"
        value={searchTerm}
        onChange={handleInputChange}
        className="border-none outline-none w-full"
      />

      <button
        className={`bg-green-600 text-white px-4 py-2 rounded-full ml-2 ${
          isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSearchMovies}
        disabled={isButtonDisabled}
      >
        Rechercher
      </button>
    </div>
  );
};

const MemoizedSearchBar = memo(SearchBar);
export default MemoizedSearchBar;
