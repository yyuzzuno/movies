import { MoviesResponse } from "./types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchMovies = ({
  keyword,
  year,
}: {
  keyword: string;
  year: string;
}) => {
  const fetchMovies = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const res = await fetch(
      `/movie?include_adult=false&language=ja-JP&page=${pageParam}&query=${encodeURIComponent(keyword)}&year=${year}`
    );
    const data: MoviesResponse = await res.json();
    return data.results;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["movies", keyword, year],
    queryFn: fetchMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage !== undefined) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};
