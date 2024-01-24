import axios from "axios";

const API_URL = "http://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_VERCEL_ENV;

export const searchMoviesByTitle = async (title: string, page: number = 1) => {
  try {
    const response = await axios.get(
      `${API_URL}?apikey=${API_KEY}&s=${title}&type=movie&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recherche de films", error);
    return null;
  }
};

export const getMovieDetailsById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du film", error);
    return null;
  }
};
