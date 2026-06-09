import type { NextConfig } from "next";

// Vercel ネイティブデプロイ。ISR・画像最適化が有効。
// GitHub Pages から移行済み（basePath / output:export は不要）。
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
