import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/img/:path*",
        destination: "https://image.tmdb.org/t/p/w500/:path*",
      },
      {
        source: "/movie",
        destination: "https://api.themoviedb.org/3/search/movie",
      },
    ];
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
