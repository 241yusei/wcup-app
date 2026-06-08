"use client";
// 試合日程ページの「推し国フィルター」タブ。
// fav:teams（既存の localStorage キー）を読み取り、★登録国の試合のみ表示するタブを追加する。
// fav:teams が空（推し登録なし）の場合はタブ自体を非表示にする。

import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import MatchCard from "@/components/schedule/MatchCard";
import { jstDateLabel } from "@/lib/datetime";

interface DateGroup {
  dateKey: string;
  matches: Match[];
}

interface Props {
  groups: DateGroup[];
  live: boolean;
}

type TabKey = "all" | "fav";

export default function ScheduleFavoriteFilter({ groups, live }: Props) {
  const [tab, setTab] = useState<TabKey>("all");
  const [favTeams, setFavTeams] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("fav:teams");
      const parsed: unknown = JSON.parse(raw || "[]");
      if (Array.isArray(parsed)) {
        setFavTeams(parsed.filter((x): x is string => typeof x === "string"));
      }
    } catch { /* noop */ }

    // fav-changed カスタムイベントで他コンポーネントとの同期
    const sync = () => {
      try {
        const raw = localStorage.getItem("fav:teams");
        const parsed: unknown = JSON.parse(raw || "[]");
        if (Array.isArray(parsed)) {
          setFavTeams(parsed.filter((x): x is string => typeof x === "string"));
        }
      } catch { /* noop */ }
    };
    window.addEventListener("fav-changed", sync);
    return () => window.removeEventListener("fav-changed", sync);
  }, []);

  // 推し国でフィルタリングされた DateGroup を計算
  const filteredGroups: DateGroup[] =
    tab === "all" || !mounted
      ? groups
      : groups
          .map((g) => ({
            ...g,
            matches: g.matches.filter(
              (m) =>
                favTeams.includes(m.homeCode) || favTeams.includes(m.awayCode)
            ),
          }))
          .filter((g) => g.matches.length > 0);

  const hasFavs = mounted && favTeams.length > 0;

  return (
    <div>
      {/* タブ（推し国が1つ以上あるときのみ表示） */}
      {hasFavs && (
        <div className="flex gap-2 mb-6">
          {(
            [
              { key: "all" as TabKey, label: "すべての試合" },
              { key: "fav" as TabKey, label: `⭐ 推し国（${favTeams.length}カ国）` },
            ] as { key: TabKey; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-jpnavy text-white"
                  : "bg-surface border border-line text-muted hover:text-jpnavy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* 空状態（推し国タブで試合なし）*/}
      {tab === "fav" && filteredGroups.length === 0 && (
        <div className="text-center py-16">
          <p className="text-3xl mb-3">⭐</p>
          <p className="font-bold mb-1">推し国の試合が見つかりません</p>
          <p className="text-sm text-muted">
            各国図鑑の「★」ボタンで推し国を登録すると、ここに試合が表示されます。
          </p>
        </div>
      )}

      {/* 試合一覧 */}
      <div className="space-y-8">
        {filteredGroups.map((g) => (
          <section key={g.dateKey}>
            <div className="flex items-center gap-2 mb-3 sticky top-16 bg-background/95 py-2 z-10">
              <h2 className="text-lg font-bold">{jstDateLabel(g.matches[0].utcDate)}</h2>
              <span className="text-xs text-muted">{g.matches.length}試合</span>
            </div>
            <div className="space-y-3">
              {g.matches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* データソース表示 */}
      <p className="text-xs text-muted mt-6">
        {live
          ? "🟢 ライブデータ取得中（football-data.org）"
          : "📋 サンプル日程を表示中（APIキー設定で自動更新）"}
      </p>
    </div>
  );
}
