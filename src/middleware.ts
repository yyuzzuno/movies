import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/tmdb")) {
    const requestHeaders = new Headers();
    requestHeaders.set(
      "Authorization",
      "" // TODO: 環境変数からトークンを読み込む。APIリードアクセストークンを再生成して古いトークンを無効化済み
    );
    requestHeaders.set("accept", "application/json");
    requestHeaders.set("Host", "api.themoviedb.org");
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}
