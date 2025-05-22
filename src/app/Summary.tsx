import Image from "next/image";

// TODO: genreRecordについて動的に対応する
const genreColorRecord: Record<string, string | undefined> = {
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

const defaultGenreColor = "#F1A10D";

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
    <div className="flex flex-col gap-2 text-[1.2rem] font-normal items-center">
      <Image
        alt={`${title}のサムネイル`}
        width={249}
        height={329}
        src={`https://image.tmdb.org/t/p/w500/${thumbnail_path}`}
        className="rounded"
      />
      <span>{title}</span>
      <span>{release_date}</span>
      <div className="flex gap-2 flex-wrap mt-2 justify-center">
        {genres.map((genre) => (
          <span
            key={genre}
            className="text-white px-2 py-1 rounded text-xs"
            style={{ background: genreColorRecord[genre] ?? defaultGenreColor }}
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};
