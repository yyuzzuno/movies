// TODO: genreRecordについて動的に対応する
const genreColorRecord: Record<string, string> = {
  アクション: "#FF5733",
  アドベンチャー: "#33FF57",
  アニメーション: "#3357FF",
  コメディ: "#FF33A1",
  犯罪: "#FF8C33",
  ドキュメンタリー: "#33FFF5",
  ドラマ: "#FF33D4",
  ファミリー: "#FF5733",
  ファンタジー: "#33FF57",
  履歴: "#3357FF",
  ホラー: "#FF33A1",
  音楽: "#FF8C33",
  謎: "#33FFF5",
  ロマンス: "#FF33D4",
  サイエンスフィクション: "#FF5733",
  テレビ映画: "#33FF57",
  スリラー: "#3357FF",
  戦争: "#FF33A1",
  西洋: "#FF8C33",
};

interface MovieProps {
  title: string;
  thumbnail_path: string;
  release_date: string;
  genres: Array<string>;
}

export const Summary = ({
  title,
  thumbnail_path,
  release_date,
  genres,
}: MovieProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontSize: "1.2rem",
        fontWeight: 400,
      }}
    >
      {/* TODO: next/imageを使用する */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={`${title}のサムネイル`}
        src={`https://image.tmdb.org/t/p/w500${thumbnail_path}`}
        style={{
          background: "#ddd",
          borderRadius: "4px",
          width: "100%",
          aspectRatio: "3/4",
        }}
      />
      <span>{title}</span>
      <span>{release_date}</span>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "8px",
        }}
      >
        {genres.map((genre) => (
          <span
            key={genre}
            style={{
              background: genreColorRecord[genre],
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.8rem",
            }}
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};
