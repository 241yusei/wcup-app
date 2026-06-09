import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import OnboardingQuiz from "@/components/OnboardingQuiz";
import PeekCat from "@/components/PeekCat";
import PWARegister from "@/components/PWARegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteTitle = "100倍Wカップ｜日本代表を100倍楽しむ";
const siteDesc =
  "日本代表の試合（日本時間）・対戦国の攻略・観戦ポイント・優勝予想まで。サッカーをよく知らなくても日本戦を100倍楽しめるW杯アプリ。";

// 公開オリジン。Vercel ダッシュボードで NEXT_PUBLIC_SITE_URL を設定するか、
// VERCEL_URL（Vercel が自動付与）を利用。ローカルは localhost にフォールバック。
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: siteTitle,
  description: siteDesc,
  openGraph: {
    title: siteTitle,
    description: siteDesc,
    url: `${baseUrl}/`,
    siteName: "100倍Wカップ",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "100倍Wカップ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDesc,
    images: ["/og.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "100倍Wカップ",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="colors-stripe-thin w-full" />
        <Nav />
        <OnboardingQuiz />
        <main className="flex-1">{children}</main>
        <PeekCat />
        <PWARegister />
        <footer className="mt-16 border-t border-line bg-surface">
          <div className="colors-stripe-thin w-full" />
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-muted flex items-center justify-between">
            <span>100倍Wカップ © 2026</span>
            <span className="text-xs">
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
