import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import OnboardingQuiz from "@/components/OnboardingQuiz";
import PeekCat from "@/components/PeekCat";
import PWARegister from "@/components/PWARegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// 和文の本命フォント。CJKは巨大なので preload せず、display:swap で体感速度を確保。
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const siteTitle = "100倍Wカップ｜日本代表を100倍楽しむ";
const siteDesc =
  "日本代表の試合（日本時間）・対戦国の攻略・観戦ポイント・優勝予想まで。サッカーをよく知らなくても日本戦を100倍楽しめるW杯アプリ。";

// GitHub Pages のサブパス（NEXT_PUBLIC_BASE_PATH=/wcup-app）。
const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
// 公開オリジン（GitHub Pages）。未設定時はフォールバック。
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://241yusei.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: siteTitle,
  description: siteDesc,
  openGraph: {
    title: siteTitle,
    description: siteDesc,
    url: `${baseUrl}${bp}/`,
    siteName: "100倍Wカップ",
    locale: "ja_JP",
    type: "website",
    images: [{ url: `${bp}/og.png`, width: 1200, height: 630, alt: "100倍Wカップ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDesc,
    images: [`${bp}/og.png`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "100倍Wカップ",
  },
  icons: {
    icon: [
      { url: `${bp}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${bp}/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: `${bp}/apple-touch-icon.png`, sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#14224f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${notoSansJP.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* 深夜観戦モードの初期適用（FOUC防止）。保存設定 > OSのダーク設定の順で判定 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="colors-stripe-thin w-full" />
        <Nav />
        <OnboardingQuiz />
        <main className="flex-1">{children}</main>
        <PeekCat />
        <PWARegister />
        <footer className="mt-20 border-t border-line bg-surface">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-bold tracking-tight">
              <span className="text-jpred">100倍</span>
              <span className="text-jpnavy">Wカップ</span>
              <span className="text-muted font-normal text-sm ml-2">© 2026</span>
            </span>
            <span className="text-xs text-muted leading-relaxed">
              データは各公式ソースを参照・要約。映像/画像の無断転載はしません。
            </span>
          </div>
        </footer>
        {/* モバイルの固定ボトムナビ分のスペーサー */}
        <div className="md:hidden h-16" aria-hidden="true" />
      </body>
    </html>
  );
}
