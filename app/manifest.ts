import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "100倍Wカップ｜日本代表を100倍楽しむ",
    short_name: "100倍Wカップ",
    description:
      "2026ワールドカップを100倍楽しむアプリ。日本戦の日程（日本時間）・対戦国の攻略・観戦ポイント・優勝予想まで。",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4f1e8",
    theme_color: "#14224f",
    lang: "ja",
    categories: ["sports", "news"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "日本特集",
        short_name: "日本特集",
        url: "/japan",
        description: "日本代表を100倍楽しむ",
      },
      {
        name: "試合日程",
        short_name: "日程",
        url: "/schedule",
        description: "全試合を日本時間で",
      },
    ],
  };
}
