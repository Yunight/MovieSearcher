import { selectSelectedMovie } from "../redux/movieSlice";
import { Movie } from "../types/movie";
import { useAppSelector } from "../redux/store";

const MovieDetail = () => {
  const movieDetail: Movie | null = useAppSelector(selectSelectedMovie);

  if (!movieDetail) {
    return <div>No movie selected</div>;
  }

  return (
    <>
      <div className="flex flex-col items-left text-left justify-center">
        <h2 className="my-2 text-2xl">{movieDetail.Title}</h2>
        <p className="my-1 text-xl">Réalisateur: {movieDetail.Director}</p>
        <p className="mb-3">Intrigue: {movieDetail.Plot}</p>
      </div>
      <div className="flex flex-col justify-center items-center ">
        {movieDetail.Poster !== "N/A" ? (
          <img
            src={movieDetail.Poster}
            alt={`Affiche du film ${movieDetail.Title}`}
            className="max-w-fit h-fit "
          />
        ) : (
          <img
            src={"https://placehold.co/400x500"}
            alt={`Affiche du film ${movieDetail.Title}`}
            className="max-w-full h-auto"
          />
        )}
      </div>
    </>
  );
};

export default MovieDetail;
