import type { NextConfig } from "next";
import path from "node:path";

const isProd = process.env.NODE_ENV === "production";
// On GitHub Pages we serve at /tc-toulouse/.
// Local dev keeps the root.
const basePath = isProd ? "/tc-toulouse" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
