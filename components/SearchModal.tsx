"use client";
// 横断検索。FotMob/Sofascore/OneFootballは全て検索を備えるが、本アプリには無かった。
// 48カ国・注目選手・日本代表26名・主要ページをクライアントサイドで一括検索する。
// 静的サイトなのでデータは全てバンドル済み — 外部APIなしで即時応答できる。

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { teams } from "@/data/teams";
import { squad } from "@/data/squad";

interface Hit {
  type: "国" | "選手" | "日本代表" | "ページ";
  icon: string;
  title: string;
  sub: string;
  href: string;
}

const PAGES: Hit[] = [
  { type: "ページ", icon: "🌙", title: "因縁", sub: "試合を物語として読む", href: "/story" },
  { type: "ページ", icon: "📔", title: "マイW杯アルバム", sub: "観戦記録・予想成績", href: "/album" },
  { type: "ページ", icon: "🇯🇵", title: "日本特集", sub: "突破条件・対戦国攻略", href: "/japan" },
  { type: "ページ", icon: "📋", title: "代表メンバー", sub: "日本代表26名の名簿", href: "/squad" },
  { type: "ページ", icon: "🕐", title: "試合日程", sub: "全試合を日本時間で", href: "/schedule" },
  { type: "ページ", icon: "📊", title: "グループ順位表", sub: "全12組の勝点状況", href: "/groups" },
  { type: "ページ", icon: "🏆", title: "決勝トーナメント", sub: "ラウンド32〜決勝", href: "/bracket" },
  { type: "ページ", icon: "👟", title: "得点ランキング", sub: "ゴールデンブーツ・レース", href: "/stats" },
  { type: "ページ", icon: "🏟", title: "スタジアム・開催都市", sub: "16会場ガイド", href: "/venues" },
  { type: "ページ", icon: "🔮", title: "予想", sub: "自分の勝敗予想＋識者の優勝予想", href: "/predictions" },
  { type: "ページ", icon: "📺", title: "どこで見る？", sub: "放送・配信ガイド", href: "/watch" },
  { type: "ページ", icon: "📰", title: "ニュース", sub: "最新情報・面白ネタ", href: "/news" },
  { type: "ページ", icon: "🧭", title: "学ぶ", sub: "入門・深掘り・トリオン解説", href: "/guide" },
];

function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  for (const t of teams) {
    hits.push({
      type: "国",
      icon: t.flag,
      title: t.name,
      sub: `${t.enName}・グループ${t.group}・${t.nickname}`,
      href: `/teams/${t.code}`,
    });
    for (const p of t.players) {
      hits.push({
        type: "選手",
        icon: t.flag,
        title: p.name,
        sub: `${t.name}・${p.position}・${p.club}`,
        href: `/teams/${t.code}`,
      });
    }
  }
  for (const p of squad) {
    hits.push({
      type: "日本代表",
      icon: "🇯🇵",
      title: p.name,
      sub: `#${p.number}・${p.position}・${p.club}`,
      href: "/squad",
    });
  }
  hits.push(...PAGES);
  return hits;
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    if (open) {
      setQ("");
      // モーダル描画後にフォーカス
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Escで閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const query = q.trim().toLowerCase();
  const results =
    query.length === 0
      ? []
      : index
          .filter(
            (h) =>
              h.title.toLowerCase().includes(query) ||
              h.sub.toLowerCase().includes(query)
          )
          .slice(0, 20);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-9 w-9 rounded-full border border-line bg-surface flex items-center justify-center text-base hover:border-jpnavy/50 transition-colors shrink-0"
        title="検索（国・選手・ページ）"
        aria-label="検索を開く"
      >
        🔍
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-[12vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-surface border border-line shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
              <span aria-hidden>🔍</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="国名・選手名・ページを検索…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-muted hover:text-foreground px-2 py-1 rounded border border-line"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto">
              {query.length === 0 ? (
                <p className="px-4 py-6 text-sm text-muted text-center">
                  例：「ブラジル」「三笘」「順位表」「ハーランド」
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-6 text-sm text-muted text-center">
                  「{q}」は見つからなかった。国名・選手名・ページ名で試してみてくれ。
                </p>
              ) : (
                <ul>
                  {results.map((h, i) => (
                    <li key={`${h.href}-${h.title}-${i}`}>
                      <Link
                        href={h.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-background transition-colors"
                      >
                        <span className="text-xl shrink-0" aria-hidden>
                          {h.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold truncate">
                            {h.title}
                          </span>
                          <span className="block text-xs text-muted truncate">
                            {h.sub}
                          </span>
                        </span>
                        <span className="text-[10px] font-bold text-jpnavy border border-jpnavy/30 rounded-full px-2 py-0.5 shrink-0">
                          {h.type}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
