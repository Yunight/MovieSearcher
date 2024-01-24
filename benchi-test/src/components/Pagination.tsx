import {
  selectTotalPages,
  selectCurrentPage,
  selectPaginationWindow,
  goToNextPageSet,
  goToPreviousPageSet,
  selectMovies,
} from "../redux/movieSlice";
import useMovieSearch from "../hooks/useMovieSearch";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const totalPages = useAppSelector(selectTotalPages);
  const currentPage = useAppSelector(selectCurrentPage);
  const movies = useAppSelector(selectMovies);
  const paginationWindow = useAppSelector(selectPaginationWindow);
  const { handlePageChange } = useMovieSearch();

  if (totalPages === 0) return null;

  return (
    movies.length > 0 &&
    totalPages > 0 && (
      <div className="flex items-center space-x-1 mb-3">
        {paginationWindow[0] > 1 && (
          <button
            onClick={() => dispatch(goToPreviousPageSet())}
            className="px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100"
          >
            Pages précédentes
          </button>
        )}

        {Array.from(
          {
            length: Math.min(
              paginationWindow[1] - paginationWindow[0] + 1,
              totalPages
            ),
          },
          (_, i) => paginationWindow[0] + i
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-2 py-1 text-sm font-medium rounded-md ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "text-gray-700 bg-white hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {paginationWindow[1] < totalPages && (
          <button
            onClick={() => dispatch(goToNextPageSet())}
            className="px-2 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100"
          >
            Pages suivantes
          </button>
        )}
      </div>
    )
  );
};

const MemoizedPagination = memo(Pagination);
export default MemoizedPagination;
