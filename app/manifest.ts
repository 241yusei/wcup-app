import type { MetadataRoute } from "next";

// GitHub Pages のサブパス対応（NEXT_PUBLIC_BASE_PATH=/wcup-app）。
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

// 静的書き出し（output: export）で manifest を静的生成させる。
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "100倍Wカップ｜日本代表を100倍楽しむ",
    short_name: "100倍Wカップ",
    description:
      "2026ワールドカップを100倍楽しむアプリ。日本戦の日程（日本時間）・対戦国の攻略・観戦ポイント・優勝予想まで。",
    start_url: `${bp}/`,
    scope: `${bp}/`,
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4f1e8",
    theme_color: "#14224f",
    lang: "ja",
    categories: ["sports", "news"],
    icons: [
      {
        src: `${bp}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${bp}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${bp}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "日本特集",
        short_name: "日本特集",
        url: `${bp}/japan`,
        description: "日本代表を100倍楽しむ",
      },
      {
        name: "試合日程",
        short_name: "日程",
        url: `${bp}/schedule`,
        description: "全試合を日本時間で",
      },
    ],
  };
}
