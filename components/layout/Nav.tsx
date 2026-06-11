"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SearchModal from "@/components/SearchModal";
import ThemeToggle from "@/components/ThemeToggle";

// 全ナビアイテム（デスクトップ全表示 / モバイルはメニューシートで全表示）
const allLinks = [
  { href: "/", label: "ホーム", icon: "🏠" },
  { href: "/story", label: "因縁", icon: "🌙" },
  { href: "/japan", label: "日本特集", icon: "🇯🇵" },
  { href: "/news", label: "ニュース", icon: "📰" },
  { href: "/schedule", label: "試合日程", icon: "📅" },
  { href: "/groups", label: "順位表", icon: "🏆" },
  { href: "/predictions", label: "勝敗予想", icon: "⭐" },
  { href: "/teams", label: "各国図鑑", icon: "🌍" },
  { href: "/album", label: "アルバム", icon: "📔" },
  { href: "/watch", label: "どこで見る", icon: "📺" },
];

// モバイルボトムナビ：最重要4タブ＋メニューの5スロット構成
const bottomNavLinks = [
  { href: "/", label: "ホーム", icon: "🏠" },
  { href: "/story", label: "因縁", icon: "🌙" },
  { href: "/japan", label: "日本特集", icon: "🇯🇵" },
  { href: "/schedule", label: "試合日程", icon: "📅" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // ページ遷移でメニューを自動クローズ
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ─── トップヘッダー（全画面幅で表示） ─── */}
      <header className="bg-surface/90 backdrop-blur border-b border-line sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-3 h-16">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image
              src="/mascot-v2.png"
              alt="ワールドカップ人間くん"
              width={144}
              height={144}
              className="h-9 w-9 rounded-full object-cover border border-line bg-background group-hover:scale-105 transition-transform"
              style={{ objectPosition: "50% 12%" }}
            />
            <span className="font-bold text-lg tracking-tight">
              <span className="text-jpred">100倍</span>
              <span className="text-jpnavy">Wカップ</span>
            </span>
          </Link>

          {/* 検索＆深夜観戦モード（全画面幅で表示） */}
          <div className="ml-auto md:ml-0 md:order-last flex items-center gap-2 shrink-0">
            <SearchModal />
            <ThemeToggle />
          </div>

          {/* デスクトップナビ — md以上のみ表示 */}
          <nav className="hidden md:flex gap-1 md:ml-auto overflow-x-auto no-scrollbar">
            {allLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive(l.href)
                    ? "bg-jpnavy text-white"
                    : "text-muted hover:text-jpnavy hover:bg-line/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── モバイル固定ボトムナビバー（md未満のみ） ─── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur border-t border-line"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex h-16">
          {bottomNavLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
                  active ? "text-jpnavy" : "text-muted"
                }`}
              >
                {/* アクティブインジケーター（上端バー）*/}
                {active && (
                  <span className="absolute top-0 left-3 right-3 h-0.5 bg-jpnavy rounded-b-full" />
                )}
                <span className="text-xl leading-none">{l.icon}</span>
                <span className="text-[10px] font-medium leading-none mt-0.5">{l.label}</span>
              </Link>
            );
          })}

          {/* メニューボタン（残り全タブをボトムシートで表示） */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
              menuOpen ? "text-jpnavy" : "text-muted"
            }`}
            aria-label="メニューを開く"
          >
            {menuOpen && (
              <span className="absolute top-0 left-3 right-3 h-0.5 bg-jpnavy rounded-b-full" />
            )}
            <span className="text-xl leading-none">☰</span>
            <span className="text-[10px] font-medium leading-none mt-0.5">メニュー</span>
          </button>
        </div>
      </nav>

      {/* ─── モバイルメニュー バックドロップ ─── */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ─── モバイルメニュー ボトムシート ─── */}
      <div
        className={`md:hidden fixed left-0 right-0 z-40 bg-background rounded-t-3xl border-t border-x border-line shadow-2xl transition-transform duration-200 ease-out ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          bottom: `calc(4rem + env(safe-area-inset-bottom))`,
        }}
      >
        {/* ドラッグハンドル */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-line rounded-full" />
        </div>
        <p className="text-xs text-muted text-center pb-3 font-medium">すべてのメニュー</p>

        <div className="px-4 pb-5 grid grid-cols-2 gap-2">
          {allLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-colors ${
                  active
                    ? "border-jpnavy bg-jpnavy/10 text-jpnavy font-semibold"
                    : "border-line bg-surface text-foreground hover:border-jpnavy/40"
                }`}
              >
                <span className="text-xl leading-none">{l.icon}</span>
                <span className="text-sm font-medium">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
