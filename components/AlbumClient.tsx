"use client";
// マイW杯アルバム — この端末に積み上がった「自分のW杯」を1ページに集約する。
// 観たよスタンプ・勝敗予想の成績・観戦メモ・診断レベルを localStorage から読む。

import { useEffect, useState } from "react";
import Link from "next/link";
import { readWatched } from "@/components/WatchedStamp";
import { QUIZ_DONE_KEY, QUIZ_RESULT_KEY, levels, QuizResult } from "@/data/quiz";

export interface AlbumMatch {
  id: string;
  homeFlag: string;
  awayFlag: string;
  homeName: string;
  awayName: string;
  dateLabel: string; // "6/15(月) 05:00"
  stage: string;
  jp: boolean;
  finished: boolean;
  homeScore?: number;
  awayScore?: number;
}

interface Stats {
  watchedIds: string[];
  predTotal: number; // 予想した試合数（未判定含む）
  predJudged: number; // 結果が出て判定済みの数
  predHit: number;
  noteCount: number;
  levelEmoji?: string;
  levelName?: string;
}

export default function AlbumClient({ matches }: { matches: AlbumMatch[] }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [copied, setCopied] = useState(false);

  const load = () => {
    const watchedIds = readWatched();

    // 勝敗予想の成績: 終了済みの試合だけ採点
    let predTotal = 0;
    let predJudged = 0;
    let predHit = 0;
    for (const m of matches) {
      try {
        const p = localStorage.getItem(`pred:${m.id}`);
        if (!p) continue;
        predTotal++;
        if (m.finished && m.homeScore != null && m.awayScore != null) {
          predJudged++;
          const actual =
            m.homeScore > m.awayScore ? "H" : m.homeScore < m.awayScore ? "A" : "D";
          if (p === actual) predHit++;
        }
      } catch {
        /* noop */
      }
    }

    // 観戦メモの数
    let noteCount = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k?.startsWith("note:") && localStorage.getItem(k)) noteCount++;
      }
    } catch {
      /* noop */
    }

    // 診断レベル
    let levelEmoji: string | undefined;
    let levelName: string | undefined;
    try {
      if (localStorage.getItem(QUIZ_DONE_KEY) === "1") {
        const raw = localStorage.getItem(QUIZ_RESULT_KEY);
        if (raw) {
          const r = JSON.parse(raw) as QuizResult;
          const lv = levels.find((l) => l.id === r.levelId);
          levelEmoji = lv?.emoji;
          levelName = lv?.name;
        }
      }
    } catch {
      /* noop */
    }

    setStats({
      watchedIds,
      predTotal,
      predJudged,
      predHit,
      noteCount,
      levelEmoji,
      levelName,
    });
  };

  useEffect(() => {
    load();
    window.addEventListener("watched-changed", load);
    return () => window.removeEventListener("watched-changed", load);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!stats) {
    return <div className="py-20 text-center text-muted text-sm">アルバムを開いています…</div>;
  }

  const watchedMatches = matches.filter((m) => stats.watchedIds.includes(m.id));
  const jpWatched = watchedMatches.filter((m) => m.jp).length;

  const shareText = [
    `📔 わたしのW杯2026`,
    stats.levelEmoji ? `${stats.levelEmoji} ${stats.levelName}` : null,
    `⚽ 観た試合: ${watchedMatches.length}試合（日本戦${jpWatched}）`,
    stats.predJudged > 0
      ? `🔮 勝敗予想: ${stats.predHit}/${stats.predJudged}的中`
      : stats.predTotal > 0
        ? `🔮 勝敗予想: ${stats.predTotal}試合に予想中`
        : null,
    stats.noteCount > 0 ? `📝 観戦メモ: ${stats.noteCount}件` : null,
    `#100倍Wカップ`,
  ]
    .filter(Boolean)
    .join("\n");

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="space-y-8">
      {/* サマリーカード */}
      <section className="rounded-2xl border-2 border-jpnavy bg-jpnavy text-white p-6 relative overflow-hidden">
        <div className="colors-stripe-thin absolute top-0 left-0 right-0" />
        <div className="flex items-center gap-3 mb-4">
          {stats.levelEmoji && <span className="text-3xl">{stats.levelEmoji}</span>}
          <div>
            <div className="text-xs text-white/60">わたしのW杯2026</div>
            <div className="font-bold text-lg">
              {stats.levelName ?? "観戦スタイル未診断"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-white/10 py-3">
            <div className="text-2xl font-bold">{watchedMatches.length}</div>
            <div className="text-[11px] text-white/70">観た試合</div>
          </div>
          <div className="rounded-xl bg-white/10 py-3">
            <div className="text-2xl font-bold">
              {stats.predJudged > 0
                ? `${stats.predHit}/${stats.predJudged}`
                : stats.predTotal > 0
                  ? `${stats.predTotal}件`
                  : "—"}
            </div>
            <div className="text-[11px] text-white/70">
              {stats.predJudged > 0 ? "予想的中" : "予想中（判定待ち）"}
            </div>
          </div>
          <div className="rounded-xl bg-white/10 py-3">
            <div className="text-2xl font-bold">{stats.noteCount}</div>
            <div className="text-[11px] text-white/70">観戦メモ</div>
          </div>
        </div>
        <button
          onClick={copyShare}
          className="mt-4 w-full rounded-full bg-white text-jpnavy text-sm font-bold py-2.5 hover:bg-white/90 transition-colors"
        >
          {copied ? "✅ コピーしました！Xに貼り付けよう" : "📋 アルバムをシェア用にコピー"}
        </button>
      </section>

      {/* スタンプ帳 */}
      <section>
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          🔴 観戦スタンプ帳
        </h2>
        {watchedMatches.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line p-8 text-center">
            <p className="text-muted text-sm mb-3">
              まだスタンプがありません。
              <br />
              試合を観たら、試合ページで「観たよスタンプ」を押そう。
            </p>
            <Link
              href="/schedule"
              className="inline-block text-sm font-bold text-jpnavy underline underline-offset-4"
            >
              試合日程を見る →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {watchedMatches.map((m) => (
              <Link
                key={m.id}
                href={`/matches/${m.id}`}
                className={`rounded-xl border p-4 bg-surface relative hover:shadow-md transition-shadow ${
                  m.jp ? "border-jpred" : "border-line"
                }`}
              >
                <span
                  className="absolute -top-2 -right-2 text-2xl rotate-12"
                  aria-hidden
                >
                  🔴
                </span>
                <div className="text-xs text-muted mb-1">
                  {m.stage}・{m.dateLabel}
                </div>
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <span>{m.homeFlag}</span>
                  {m.homeName}
                  <span className="text-muted font-normal mx-0.5">
                    {m.finished && m.homeScore != null
                      ? `${m.homeScore} - ${m.awayScore}`
                      : "vs"}
                  </span>
                  {m.awayName}
                  <span>{m.awayFlag}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
