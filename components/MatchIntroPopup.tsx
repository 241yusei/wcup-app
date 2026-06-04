"use client";
import { useEffect, useState } from "react";

interface MKItem {
  normal: string;
  simple: string;
}
export interface MustKnowData {
  point: MKItem;
  player: MKItem;
  tactic: MKItem;
}

// 試合を開いた時に出る「これだけは押さえておくべき」ポップアップ。
// くわしく/かんたんに の2モード。初回は自動表示、以降はボタンで再表示。
export default function MatchIntroPopup({
  id,
  title,
  mustKnow,
  fallbackPoint,
}: {
  id: string;
  title: string;
  mustKnow: MustKnowData | null;
  fallbackPoint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"normal" | "simple">("normal");

  useEffect(() => {
    try {
      if (!localStorage.getItem(`intro:${id}`)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [id]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(`intro:${id}`, "1");
    } catch {
      /* noop */
    }
  };

  const pick = (it: MKItem) => (mode === "simple" ? it.simple : it.normal);

  const Card = ({
    icon,
    label,
    text,
  }: {
    icon: string;
    label: string;
    text: string;
  }) => (
    <div className="rounded-xl border border-line bg-surface p-3">
      <div className="text-xs font-bold text-jpnavy mb-1">
        {icon} {label}
      </div>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );

  return (
    <>
      {/* 再表示ボタン（ヘッダー内に置く想定） */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white text-jpnavy hover:opacity-90 transition-opacity"
      >
        📌 これだけは押さえる
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
          <button
            aria-label="閉じる"
            onClick={close}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative w-full sm:max-w-md bg-background rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[88vh] overflow-y-auto">
            {/* ヘッダー */}
            <div className="sticky top-0 bg-jpnavy text-white px-4 py-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] text-white/70">
                  📌 これだけは押さえておくべき
                </div>
                <div className="font-bold leading-tight">{title}</div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="閉じる"
                className="text-white/80 hover:text-white text-xl leading-none shrink-0"
              >
                ✕
              </button>
            </div>

            {/* モード切替 */}
            <div className="px-4 pt-3">
              <div className="inline-flex rounded-full border border-line bg-surface p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMode("normal")}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    mode === "normal" ? "bg-jpnavy text-white" : "text-muted"
                  }`}
                >
                  ⚽ くわしく
                </button>
                <button
                  type="button"
                  onClick={() => setMode("simple")}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    mode === "simple" ? "bg-jpred text-white" : "text-muted"
                  }`}
                >
                  😀 かんたんに
                </button>
              </div>
              {mode === "simple" && (
                <div className="text-[11px] text-jpred font-medium mt-1.5">
                  サッカーが分からなくても大丈夫！やさしい言葉で説明します。
                </div>
              )}
            </div>

            {/* 中身 */}
            <div className="p-4 space-y-3">
              {mustKnow ? (
                <>
                  <Card icon="🎯" label="ここがポイント！" text={pick(mustKnow.point)} />
                  <Card icon="⭐" label="この選手 見とけ！" text={pick(mustKnow.player)} />
                  <Card icon="🧠" label="戦術はこう見る" text={pick(mustKnow.tactic)} />
                </>
              ) : (
                <>
                  {fallbackPoint && (
                    <Card icon="🎯" label="ここがポイント！" text={fallbackPoint} />
                  )}
                  <Card
                    icon="😀"
                    label="かんたんに言うと"
                    text="むずかしく考えなくてOK。どっちが勝つか予想して、ゴールが入ったら一緒に盛り上がる。それだけでサッカーは100倍楽しい！下の見どころ・注目選手も覗いてみよう。"
                  />
                </>
              )}
            </div>

            {/* フッター */}
            <div className="px-4 pb-4">
              <button
                type="button"
                onClick={close}
                className="w-full py-2.5 rounded-full bg-jpnavy text-white font-bold"
              >
                わかった！試合を楽しむ ⚽
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
