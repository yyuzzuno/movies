import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**")],
  },
  async rewrites() {
    return [
      {
        source: "/tmdb/movie",
        destination: "https://api.themoviedb.org/3/search/movie",
      },
      {
        source: "/tmdb/genre",
        destination:
          "https://api.themoviedb.org/3/genre/movie/list?language=ja",
      },
    ];
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
