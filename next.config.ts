import type { NextConfig } from "next";

// GitHub Pages 公開用に静的書き出し（static export）。
// ビルド時に NEXT_PUBLIC_BASE_PATH=/wcup-app を渡すとプロジェクトページのサブパスに対応。
// ローカル開発・ビルドでは空のままなのでルートで動作する。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./image-loader.ts" },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
