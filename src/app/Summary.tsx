import Image from "next/image";

// TODO: genreRecordについて動的に対応する
const genreColorRecord: Record<string, string | undefined> = {
  アクション: "#DD5733",
  アドベンチャー: "#33DD57",
  アニメーション: "#3357DD",
  コメディ: "#DD33A1",
  犯罪: "#DD8C33",
  ドキュメンタリー: "#33DDD5",
  ドラマ: "#DD5733",
  ファミリー: "#DD5733",
  ファンタジー: "#33DD57",
  履歴: "#3357DD",
  ホラー: "#DD33A1",
  音楽: "#DD8C33",
  謎: "#33DDD5",
  ロマンス: "#DD33D4",
  サイエンスフィクション: "#33CC57",
  テレビ映画: "#33DD57",
  スリラー: "#3357DD",
  戦争: "#DD33A1",
  西洋: "#DD8C33",
};

const defaultGenreColor = "#F1A10D";

interface MovieProps {
  title: string;
  thumbnail_path: string;
  release_date: string;
  genres: Array<string>;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるので+1
  const day = date.getDate();

  return { year: `${year}年`, date: `${month}月${day}日` };
}

export const Summary = ({
  title,
  thumbnail_path,
  release_date,
  genres,
}: MovieProps) => {
  const { year, date } = formatDate(release_date);
  return (
    <div className="p-[8px] flex flex-col gap-2 text-[1.2rem] font-normal items-center border border-white/40 border-r-white/20 border-b-white/20 rounded-md">
      <Image
        alt={`${title}のサムネイル`}
        width={249}
        height={329}
        src={`https://image.tmdb.org/t/p/w500/${thumbnail_path}`}
        className="rounded"
      />
      <span className="sign-four max-w-full break-words text-center font-bold">
        {title}
      </span>
      <div className="sign-four flex flex-col gap-2 text-sm md:text-base md:flex-row items-center">
        <span>{year}</span>
        <span className="whitespace-nowrap">{date}</span>
      </div>

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
