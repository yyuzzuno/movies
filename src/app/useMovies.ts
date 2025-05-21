import { useEffect, useMemo, useState } from "react";
import { Movie, MoviesResponse, MoviesProps } from "./types";

type page = number;
const nMoviesInPage = 20;

export const useFetchMovies = (to: page = 1): MoviesProps => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const controller = useMemo(() => new AbortController(), []);

  const fetchMovies = async (i: page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/movie?include_adult=false&include_video=false&language=ja-JP&page=${i}&sort_by=popularity.desc`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: MoviesResponse = await response.json();
      setIsLoading(false);
      if (!data) return;
      setMovies((d) => [...d, ...data.results]);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  useEffect(() => {
    const offset = movies.length / nMoviesInPage;
    const page_numbers = Array.from(
      { length: to - offset },
      (_, i) => i + offset + 1
    );

    page_numbers.forEach((page) => {
      fetchMovies(offset + page);
    });

    return () => {
      controller.abort();
    };
  }, [to, controller, movies.length]);

  return { movies, isLoading, isError };
};
