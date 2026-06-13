"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SearchModal from "@/components/SearchModal";
import ThemeToggle from "@/components/ThemeToggle";

// ── 情報設計：5つの主要セクションに集約（FotMob/ESPN流のタブ構成）──
// 主要：ホーム / 試合 / 日本 / 図鑑 / もっと
// 「試合」「日本」は配下の関連ページをまとめたハブ（各ページ上部の SectionTabs で横断）。
type NavItem = {
  href: string;
  label: string;
  icon: string;
  // このセクションが「現在地」とみなすパス群（ハブ集約用）
  match?: string[];
};

const PRIMARY: NavItem[] = [
  { href: "/", label: "ホーム", icon: "🏠" },
  {
    href: "/schedule",
    label: "試合",
    icon: "⚽",
    match: ["/schedule", "/groups", "/bracket", "/stats", "/venues", "/matches"],
  },
  { href: "/japan", label: "日本", icon: "🇯🇵", match: ["/japan", "/squad"] },
  { href: "/teams", label: "図鑑", icon: "🌍", match: ["/teams"] },
];

// 「もっと」シートに入れる副次セクション。
const SECONDARY: NavItem[] = [
  { href: "/story", label: "因縁ストーリー", icon: "🌙" },
  { href: "/predictions", label: "予想", icon: "🔮" },
  { href: "/news", label: "ニュース", icon: "📰" },
  { href: "/watch", label: "どこで見る", icon: "📺" },
  { href: "/guide", label: "学ぶ（入門・深掘り・トリオン）", icon: "🧭" },
  { href: "/album", label: "マイアルバム", icon: "📔" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const matchesItem = (it: NavItem) => {
    if (it.href === "/") return pathname === "/";
    const paths = it.match ?? [it.href];
    return paths.some((p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p));
  };

  // 「もっと」がアクティブ＝主要4でも /teams でもないページにいる時
  const moreActive =
    !PRIMARY.some((it) => matchesItem(it)) && pathname !== "/";

  return (
    <>
      {/* ─── トップヘッダー ─── */}
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

          <div className="ml-auto md:ml-0 md:order-last flex items-center gap-2 shrink-0">
            <SearchModal />
            <ThemeToggle />
          </div>

          {/* デスクトップナビ — md以上のみ */}
          <nav className="hidden md:flex gap-1 md:ml-auto items-center">
            {PRIMARY.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3.5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  matchesItem(l)
                    ? "bg-jpnavy text-white"
                    : "text-muted hover:text-jpnavy hover:bg-line/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`px-3.5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                moreActive || menuOpen
                  ? "bg-jpnavy text-white"
                  : "text-muted hover:text-jpnavy hover:bg-line/60"
              }`}
            >
              もっと ▾
            </button>
          </nav>
        </div>
      </header>

      {/* ─── モバイル固定ボトムナビ（md未満）：主要4＋もっと ─── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur border-t border-line"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex h-16">
          {PRIMARY.map((l) => {
            const active = matchesItem(l);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
                  active ? "text-jpnavy" : "text-muted"
                }`}
              >
                {active && (
                  <span className="absolute top-0 left-3 right-3 h-0.5 bg-jpnavy rounded-b-full" />
                )}
                <span className="text-xl leading-none">{l.icon}</span>
                <span className="text-[10px] font-medium leading-none mt-0.5">{l.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
              menuOpen || moreActive ? "text-jpnavy" : "text-muted"
            }`}
            aria-label="メニューを開く"
          >
            {(menuOpen || moreActive) && (
              <span className="absolute top-0 left-3 right-3 h-0.5 bg-jpnavy rounded-b-full" />
            )}
            <span className="text-xl leading-none">☰</span>
            <span className="text-[10px] font-medium leading-none mt-0.5">もっと</span>
          </button>
        </div>
      </nav>

      {/* ─── 「もっと」シート（モバイル/デスクトップ共通） ─── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed left-0 right-0 md:left-auto md:right-4 md:max-w-sm z-40 bg-background rounded-t-3xl md:rounded-2xl border-t border-x md:border border-line shadow-2xl transition-transform duration-200 ease-out ${
          menuOpen ? "translate-y-0" : "translate-y-full md:translate-y-[150%]"
        }`}
        style={{ bottom: `calc(4rem + env(safe-area-inset-bottom))` }}
      >
        <div className="flex justify-center pt-3 pb-2 md:hidden">
          <div className="w-10 h-1 bg-line rounded-full" />
        </div>
        <p className="text-xs text-muted text-center pb-3 font-medium pt-2 md:pt-4">
          もっと楽しむ
        </p>
        <div className="px-4 pb-5 grid grid-cols-2 gap-2">
          {SECONDARY.map((l) => {
            const active = pathname.startsWith(l.href);
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
                <span className="text-sm font-medium leading-tight">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
