import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // vercel.json publishes the repo root, so this export is served from
  // /portfolio/out/ rather than the domain root. Without a relative prefix the
  // emitted markup points at /_next/... and every chunk 404s, leaving the
  // iframe blank and the parent loader stuck at 0%.
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
