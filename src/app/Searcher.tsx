"use client";

import React, { useCallback, useRef, useState } from "react";
import { Summary } from "./Summary";
import { useFetchMovies } from "./useMovies";
import { useGenre } from "./useGenre";

interface queryParams {
  keyword: string;
  year: string;
}

export const Searcher = () => {
  const keyword = useRef<HTMLInputElement>(null);
  const year = useRef<HTMLSelectElement>(null);
  const [params, setParams] = useState<queryParams | null>(null);
  const genreRecord = useGenre();
  const { data, fetchNextPage, hasNextPage, isFetching, enabled } =
    useFetchMovies({
      ...(params ?? { keyword: "", year: "" }),
    });

  // 年プルダウン用
  const years = ["2020", "2021", "2022", "2023", "2024"];

  // 検索ボタン押下時
  const handleSearch = useCallback(() => {
    const keywordValue = keyword.current?.value;
    const yearValue = year.current?.value;
    if (
      keywordValue === undefined ||
      yearValue === undefined ||
      keywordValue === ""
    ) {
      setParams(null);
      return;
    }
    setParams({ keyword: keywordValue, year: yearValue });
  }, [setParams]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16">
      <h1 className="text-3xl font-normal mb-12">Search Movie App</h1>
      <div className="flex flex-col sm:flex-row gap-12 mb-12">
        <div className="flex flex-col w-60">
          <label htmlFor="keyword" className="mb-2 text-base">
            Keyword
          </label>
          <input
            ref={keyword}
            id="keyword"
            type="text"
            className="p-3 bg-gray-100 rounded text-base border-none outline-none"
            placeholder="Enter keyword"
          />
        </div>
        <div className="flex flex-col w-60">
          <label htmlFor="year" className="mb-2 text-base">
            Release year
          </label>
          <select
            id="year"
            ref={year}
            defaultValue="2020"
            className="p-3 bg-gray-100 rounded text-base border-none outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === "" ? "選択してください" : y}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded text-base h-12 self-end hover:bg-blue-700 transition"
        >
          検索
        </button>
      </div>
      {/* 検索前 */}
      {params === null && (
        <div className="my-8 text-center text-gray-400">
          キーワードを入力して検索してください
        </div>
      )}
      {/* 検索後・0件 */}
      {data !== undefined && data.pages[0].length !== 0 ? (
        <div>
          <div className="grid grid-cols-4 gap-8 mb-12 w-full">
            {data.pages.flat().map((movie) => (
              <Summary
                key={JSON.stringify(movie)}
                title={movie.title}
                thumbnail_path={movie.poster_path!}
                release_date={movie.release_date}
                genres={
                  genreRecord === undefined
                    ? []
                    : movie.genre_ids.map((id) => genreRecord[id])
                }
              />
            ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center">
              <button
                onClick={() => fetchNextPage()}
                className="py-5 w-72 bg-gray-100 rounded text-lg hover:bg-gray-200 transition"
              >
                More Read
              </button>
            </div>
          )}
        </div>
      ) : (
        enabled &&
        !isFetching && (
          <div className="my-8 text-center text-gray-400">
            該当する映画がありませんでした
          </div>
        )
      )}
    </div>
  );
};
