"use client";
// ホームページ用の診断レベルバッジ。
// - 診断済み → レベルチップ＋「診断し直す」ボタン
// - 未診断 or スキップ → 「診断する →」バナー
// 「診断し直す / 診断する」タップで localStorage をリセットしページリロード
// → layout.tsx の OnboardingQuiz が自動的に再表示される。

import { useState, useEffect } from "react";
import {
  scoreToLevel,
  QUIZ_DONE_KEY,
  QUIZ_RESULT_KEY,
  QuizResult,
  UserLevel,
} from "@/data/quiz";

export default function HomeQuizBadge() {
  const [level, setLevel] = useState<UserLevel | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const d = localStorage.getItem(QUIZ_DONE_KEY);
      setDone(d);
      if (d === "1") {
        const raw = localStorage.getItem(QUIZ_RESULT_KEY);
        if (raw) {
          const result: QuizResult = JSON.parse(raw);
          setLevel(scoreToLevel(result.totalScore));
        }
      }
    } catch { /* noop */ }
  }, []);

  const openQuiz = () => {
    try {
      localStorage.removeItem(QUIZ_DONE_KEY);
      localStorage.removeItem(QUIZ_RESULT_KEY);
    } catch { /* noop */ }
    window.location.reload();
  };

  // SSR / hydration 前は何も出さない
  if (!mounted) return null;

  // ── 診断済み：レベルバッジ ──────────────────────────────────────────────────
  if (done === "1" && level) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-0">
        <div className="bg-surface border border-line rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl leading-none">{level.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted font-medium leading-none mb-0.5">
              あなたの観戦スタイル
            </p>
            <p className="font-bold text-sm leading-tight">{level.name}</p>
          </div>
          <button
            onClick={openQuiz}
            className="shrink-0 text-xs text-muted hover:text-jpnavy transition-colors whitespace-nowrap"
          >
            診断し直す
          </button>
        </div>
      </div>
    );
  }

  // ── 未診断 or スキップ：診断バナー ─────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-0">
      <div className="bg-jpnavy/5 border border-jpnavy/20 rounded-2xl px-4 py-3 flex items-center gap-3">
        <span className="text-2xl leading-none">🎯</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight">
            あなたの<span className="text-jpnavy">W杯観戦スタイル</span>を診断しよう
          </p>
          <p className="text-[11px] text-muted leading-snug mt-0.5">
            5問・30秒でアプリの最適な使い方がわかります
          </p>
        </div>
        <button
          onClick={openQuiz}
          className="shrink-0 px-3 py-1.5 rounded-full bg-jpnavy text-white text-xs font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          診断する →
        </button>
      </div>
    </div>
  );
}
