"use client";
// オンボーディング診断クイズ — フルスクリーンモーダル
// layout.tsx に <OnboardingQuiz /> を1行追加するだけで全ページに適用される。
// 初訪問時（quiz-done が localStorage に存在しない）、600ms後に自動表示。

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  questions,
  levels as _levels,
  scoreToLevel,
  QUIZ_DONE_KEY,
  QUIZ_RESULT_KEY,
  QuizResult,
  UserLevel,
} from "@/data/quiz";

type Phase = "idle" | "intro" | "question" | "calculating" | "result";

export default function OnboardingQuiz() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [resultLevel, setResultLevel] = useState<UserLevel | null>(null);
  const [cardVisible, setCardVisible] = useState(true); // 問題カードのフェード制御
  const [mounted, setMounted] = useState(false);

  // マウント時に localStorage を確認し、未診断なら quiz を自動表示
  useEffect(() => {
    setMounted(true);
    try {
      if (!localStorage.getItem(QUIZ_DONE_KEY)) {
        const t = setTimeout(() => setPhase("intro"), 600);
        return () => clearTimeout(t);
      }
    } catch {
      /* localStorage 使用不可の場合はスキップ */
    }
  }, []);

  // ─── ハンドラー ─────────────────────────────────────────────────────────────

  const handleSkip = () => {
    try {
      localStorage.setItem(QUIZ_DONE_KEY, "skipped");
    } catch { /* noop */ }
    setPhase("idle");
  };

  const handleStart = () => {
    setQIndex(0);
    setAnswers({});
    setTotalScore(0);
    setResultLevel(null);
    setCardVisible(true);
    setPhase("question");
  };

  const handleAnswer = (answerId: string, points: number) => {
    const newAnswers = { ...answers, [questions[qIndex].id]: answerId };
    const newScore = totalScore + points;
    setAnswers(newAnswers);
    setTotalScore(newScore);

    // カードをフェードアウトしてから次の状態へ
    setCardVisible(false);
    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex(qIndex + 1);
        setCardVisible(true);
      } else {
        // 最後の質問 → 採点アニメへ
        setPhase("calculating");
        setCardVisible(true);

        setTimeout(() => {
          const level = scoreToLevel(newScore);
          setResultLevel(level);
          const result: QuizResult = {
            levelId: level.id,
            totalScore: newScore,
            answers: newAnswers,
            completedAt: new Date().toISOString(),
          };
          try {
            localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result));
          } catch { /* noop */ }
          setPhase("result");
        }, 1600);
      }
    }, 220);
  };

  const handleFinish = () => {
    try {
      localStorage.setItem(QUIZ_DONE_KEY, "1");
    } catch { /* noop */ }
    setPhase("idle");
  };

  const handleRetake = () => {
    setAnswers({});
    setTotalScore(0);
    setResultLevel(null);
    setQIndex(0);
    setCardVisible(true);
    setPhase("intro");
  };

  // ─── 早期リターン ─────────────────────────────────────────────────────────
  if (!mounted || phase === "idle") return null;

  const currentQ = questions[qIndex];
  const progressPct = (qIndex / questions.length) * 100;

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* バックドロップ */}
      <div
        className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* モーダル本体（モバイル：ボトムシート、デスクトップ：センタリング） */}
      <div
        className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full sm:max-w-md bg-background rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[94vh] overflow-y-auto">

          {/* ─── イントロ画面 ─── */}
          {phase === "intro" && (
            <div className="p-6 pt-5 flex flex-col items-center text-center">
              {/* ドラッグハンドル（モバイル） */}
              <div className="w-10 h-1 bg-line rounded-full mb-5 sm:hidden" />
              <div className="colors-stripe-thin w-20 rounded-full mb-4" />

              <Image
                src="/mascot-v2.png"
                alt=""
                width={144}
                height={144}
                className="w-24 h-24 object-cover object-top rounded-full border-2 border-line mb-4 drop-shadow-lg"
              />
              <h2 className="text-2xl font-extrabold mb-2 leading-tight">
                <span className="text-jpred">5問</span>で診断！
                <br />
                あなたのW杯
                <br />
                観戦スタイルは？
              </h2>
              <p className="text-muted text-sm mb-1 leading-relaxed">
                サッカー力に合ったアプリの使い方を教えます。
              </p>
              <p className="text-sm font-bold text-foreground mb-6">
                ⚡ 30秒で完了します。
              </p>

              <button
                onClick={handleStart}
                className="w-full py-3.5 rounded-2xl bg-jpnavy text-white font-bold text-lg hover:opacity-90 transition-opacity mb-3"
              >
                診断スタート →
              </button>
              <button
                onClick={handleSkip}
                className="text-sm text-muted hover:text-foreground transition-colors py-2"
              >
                スキップ
              </button>
            </div>
          )}

          {/* ─── 質問画面 ─── */}
          {phase === "question" && currentQ && (
            <div className="p-6 pt-5">
              <div className="w-10 h-1 bg-line rounded-full mx-auto mb-5 sm:hidden" />

              {/* プログレスバー */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-2 bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full bg-jpred rounded-full transition-all duration-400 ease-out"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-xs text-muted font-medium shrink-0 tabular-nums">
                  {qIndex + 1} / {questions.length}
                </span>
              </div>

              {/* 質問カード（フェード） */}
              <div
                className="transition-opacity duration-200"
                style={{ opacity: cardVisible ? 1 : 0 }}
              >
                <h3 className="text-xl font-extrabold mb-1 leading-snug">
                  {currentQ.question}
                </h3>
                {currentQ.note ? (
                  <p className="text-xs text-muted mb-4">{currentQ.note}</p>
                ) : (
                  <div className="mb-4" />
                )}

                <div className="space-y-2.5">
                  {currentQ.answers.map((ans) => (
                    <button
                      key={ans.id}
                      onClick={() => handleAnswer(ans.id, ans.points)}
                      className="w-full text-left px-4 py-3.5 rounded-xl border border-line bg-surface hover:border-jpnavy hover:bg-jpnavy/5 active:scale-[0.98] transition-all text-sm font-medium leading-snug"
                    >
                      {ans.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── 採点中画面 ─── */}
          {phase === "calculating" && (
            <div className="flex flex-col items-center text-center py-20 px-6">
              <div className="text-5xl mb-4 animate-bounce">⚽</div>
              <p className="text-xl font-extrabold mb-2">診断中... ✨</p>
              <p className="text-muted text-sm">あなたのスタイルを分析しています</p>
            </div>
          )}

          {/* ─── 結果画面 ─── */}
          {phase === "result" && resultLevel && (
            <div className="pb-8">
              {/* トップストライプ */}
              <div className="colors-stripe-thin w-full" />

              <div className="p-6 pt-5">
                <div className="w-10 h-1 bg-line rounded-full mx-auto mb-5 sm:hidden" />

                {/* レベル発表 */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-3 leading-none">{resultLevel.emoji}</div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jpnavy/10 text-jpnavy text-xs font-bold mb-2">
                    ✨ 観戦スタイル診断 完了
                  </div>
                  <h2 className="text-3xl font-extrabold mb-1">{resultLevel.name}</h2>
                  <p className="text-sm text-muted italic mb-3">
                    「{resultLevel.tagline}」
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    {resultLevel.description}
                  </p>
                </div>

                {/* ウェルカムメッセージ */}
                <div className="rounded-2xl bg-jpnavy text-white p-4 mb-6">
                  <p className="text-sm font-medium leading-relaxed">
                    {resultLevel.welcomeMessage}
                  </p>
                </div>

                {/* 推薦ページ */}
                <div className="mb-6">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-3">
                    あなたにおすすめの使い方
                  </p>
                  <div className="space-y-2">
                    {resultLevel.recommendations.map((rec) => (
                      <Link
                        key={rec.href}
                        href={rec.href}
                        onClick={handleFinish}
                        className="flex items-center gap-3 p-3.5 rounded-xl border border-line bg-surface hover:border-jpnavy transition-colors group"
                      >
                        <span className="text-2xl shrink-0 leading-none">{rec.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm group-hover:text-jpnavy transition-colors">
                            {rec.title}
                          </div>
                          <div className="text-xs text-muted leading-snug">
                            {rec.reason}
                          </div>
                        </div>
                        <span className="text-muted text-lg shrink-0">›</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA ボタン群 */}
                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 rounded-2xl bg-jpnavy text-white font-bold text-base hover:opacity-90 transition-opacity mb-3"
                >
                  このアプリを始める ⚽
                </button>
                <button
                  onClick={handleRetake}
                  className="w-full text-sm text-muted hover:text-foreground transition-colors text-center py-2"
                >
                  もう一度診断する
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
