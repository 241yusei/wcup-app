import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteTitle = "100倍Wカップ｜ワールドカップを100倍楽しむ";
const siteDesc =
  "日本時間の試合日程・各国の戦術と注目選手・面白ニュースをまとめてチェック。サッカーをよく知らなくても100倍楽しめるW杯アプリ。";

export const metadata: Metadata = {
  metadataBase: new URL("https://wcup-app.vercel.app"),
  title: siteTitle,
  description: siteDesc,
  openGraph: {
    title: siteTitle,
    description: siteDesc,
    url: "https://wcup-app.vercel.app",
    siteName: "100倍Wカップ",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/mascot-v2.png", width: 256, height: 620, alt: "ワールドカップ人間くん" }],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDesc,
    images: ["/mascot-v2.png"],
  },
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
        <main className="flex-1">{children}</main>
        <footer className="mt-16 border-t border-line bg-surface">
          <div className="colors-stripe-thin w-full" />
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-muted flex items-center justify-between">
            <span>100倍Wカップ © 2026</span>
            <span className="text-xs">
              データは各公式ソースを参照・要約。映像/画像の無断転載はしません。
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
