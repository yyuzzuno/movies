import { useQuery } from "@tanstack/react-query";

export const useGenre = () => {
  const { data: datas } = useQuery({
    queryKey: ["genre"],
    queryFn: (): Promise<{ genres: Array<{ id: number; name: string }> }> =>
      fetch("/tmdb/genre").then((res) => res.json()),
  });

  const genreRecord: Record<number, string> | undefined =
    datas === undefined
      ? undefined
      : datas.genres.reduce(
          (
            acc: Record<number, string>,
            genre: { id: number; name: string }
          ) => {
            acc[genre.id] = genre.name;
            return acc;
          },
          {} as Record<number, string>
        );

  return genreRecord;
};
