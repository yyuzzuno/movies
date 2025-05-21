"use client";

import React, { useCallback, useRef, useState } from "react";
import { Summary } from "./Summary";
import { useFetchMovies } from "./useMovies";

// TODO: APIからジャンルデータを取得してレコードを作成する
// reference: https://developer.themoviedb.org/reference/genre-movie-list
const genreRecord: Record<number, string> = {
  28: "アクション",
  12: "アドベンチャー",
  16: "アニメーション",
  35: "コメディ",
  80: "犯罪",
  99: "ドキュメンタリー",
  18: "ドラマ",
  10751: "ファミリー",
  14: "ファンタジー",
  36: "履歴",
  27: "ホラー",
  10402: "音楽",
  9648: "謎",
  10749: "ロマンス",
  878: "サイエンスフィクション",
  10770: "テレビ映画",
  53: "スリラー",
  10752: "戦争",
  37: "西洋",
};

interface queryParams {
  keyword: string;
  year: string;
}

export default function Home() {
  const keyword = useRef<HTMLInputElement>(null);
  const year = useRef<HTMLSelectElement>(null);
  const [params, setParams] = useState<queryParams | null>(null);
  const [to, setTo] = useState(0);

  // useFetchMoviesをキーワード・年で呼び出す
  const { movies, isLoading, isError } = useFetchMovies({
    to,
    ...(params ?? { keyword: "", year: "" }),
  });

  // 年プルダウン用
  const years = ["2020", "2021", "2022", "2023", "2024"];

  // 検索ボタン押下時
  const handleSearch = useCallback(() => {
    const keywordValue = keyword.current?.value;
    const yearValue = year.current?.value;
    if (keywordValue === undefined || yearValue === undefined) return;
    setParams({ keyword: keywordValue, year: yearValue });
    setTo(1);
  }, [setParams]);

  return (
    <div
      style={{
        margin: "64px 0px",
        minHeight: "100vh",
        background: "#fff",
        justifySelf: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "48px" }}>
        Search Movie App
      </h1>
      <div
        style={{
          display: "flex",
          gap: "48px",
          marginBottom: "48px",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "240px" }}
        >
          <label
            htmlFor="keyword"
            style={{ marginBottom: "8px", fontSize: "1rem" }}
          >
            Keyword
          </label>
          <input
            ref={keyword}
            id="keyword"
            type="text"
            style={{
              padding: "12px",
              border: "none",
              background: "#f5f7f8",
              borderRadius: "2px",
              fontSize: "1rem",
            }}
            placeholder="Enter keyword"
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "240px" }}
        >
          <label
            htmlFor="year"
            style={{ marginBottom: "8px", fontSize: "1rem" }}
          >
            Release year
          </label>
          <select
            id="year"
            ref={year}
            defaultValue="2020"
            style={{
              padding: "12px",
              border: "none",
              background: "#f5f7f8",
              borderRadius: "2px",
              fontSize: "1rem",
            }}
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
          style={{
            padding: "12px 24px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "2px",
            fontSize: "1rem",
            height: "48px",
            alignSelf: "flex-end",
            cursor: "pointer",
          }}
        >
          検索
        </button>
      </div>
      {/* 検索前 */}
      {params === undefined && (
        <div style={{ margin: "32px 0", textAlign: "center", color: "#888" }}>
          キーワードを入力して検索してください
        </div>
      )}
      {/* 検索後・0件 */}
      {!isLoading && movies.length === 0 && (
        <div style={{ margin: "32px 0", textAlign: "center", color: "#888" }}>
          該当する映画がありませんでした
        </div>
      )}
      {/* 検索結果 */}
      {0 < to && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
            maxWidth: "1200px",
            marginBottom: "48px",
          }}
        >
          {movies.map((movie) => (
            <Summary
              key={JSON.stringify(movie)}
              title={movie.title}
              thumbnail_path={movie.poster_path!}
              release_date={movie.release_date}
              genres={movie.genre_ids.map((id) => genreRecord[id])}
            />
          ))}
        </div>
      )}
      {movies.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => {
              setTo((prev) => prev + 1);
            }}
            style={{
              padding: "20px 0",
              width: "280px",
              background: "#f5f7f8",
              border: "none",
              borderRadius: "2px",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            More Read
          </button>
        </div>
      )}
    </div>
  );
}
