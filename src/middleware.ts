import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/tmdb")) {
    const requestHeaders = new Headers();
    requestHeaders.set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWE5NDg3ZTlhYzMwZDNjNTE2MWM0ZjVmMTYxYjE1NSIsIm5iZiI6MTc0NzYyMTIzMS41MTksInN1YiI6IjY4MmE5NTZmZTE5Y2FiNTYxMjBiZDYxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k6BnDnt30X446mP_Q-3vp7z5YQtW5T4IYk6IuaBnDIk"
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
