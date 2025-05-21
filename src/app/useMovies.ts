import { useEffect, useMemo, useState } from "react";
import { Movie, MoviesResponse, MoviesProps } from "./types";

type page = number;
const nMoviesInPage = 20;

export const useFetchMovies = ({
  to = 1,
  keyword = "",
  year = "",
}: {
  to?: number;
  keyword?: string;
  year?: string;
}): MoviesProps => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const controller = useMemo(() => new AbortController(), []);

  const fetchMovies = async (i: number) => {
    setIsLoading(true);
    try {
      // クエリパラメータを組み立て
      let url = `/movie?include_adult=false&include_video=false&language=ja-JP&page=${i}&sort_by=popularity.desc`;
      if (keyword) url += `&query=${encodeURIComponent(keyword)}`;
      if (year) url += `&primary_release_year=${year}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: MoviesResponse = await response.json();
      setIsLoading(false);
      if (!data) return;
      setMovies((d) => [...d, ...data.results]);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  // 検索条件が変わったらリセット
  useEffect(() => {
    setMovies([]);
  }, [keyword, year]);

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
  }, [to, controller, movies.length, keyword, year]);

  return { movies, isLoading, isError };
};
