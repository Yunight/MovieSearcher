import { memo } from "react";
import useMovieSearch from "../hooks/useMovieSearch";

const Sorting = () => {
  const { handleSortChange } = useMovieSearch();

  return (
    <div className="sorting">
      <select
        name="sort-by"
        id="sort-by"
        className="ml-2 p-2 border border-gray-300 rounded"
        onChange={(e) => handleSortChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Tri par
        </option>
        <option value="year">Année</option>
        <option value="title">Titre</option>
      </select>
    </div>
  );
};

const MemoizedSorting = memo(Sorting);
export default MemoizedSorting;
