"use client";
import { useEffect, useState } from "react";

type Pick = "H" | "D" | "A";

// 試合の勝敗予想ウィジェット。localStorageに保存し、結果確定後に的中/はずれを表示。
export default function MatchPredictor({
  matchId,
  homeFlag,
  awayFlag,
  homeName,
  awayName,
  status,
  homeScore,
  awayScore,
  compact = false,
}: {
  matchId: string;
  homeFlag: string;
  awayFlag: string;
  homeName: string;
  awayName: string;
  status: string;
  homeScore?: number | null;
  awayScore?: number | null;
  compact?: boolean;
}) {
  const [pick, setPick] = useState<Pick | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(`pred:${matchId}`);
      if (v === "H" || v === "D" || v === "A") setPick(v);
    } catch {
      /* noop */
    }
    setLoaded(true);
  }, [matchId]);

  const finished =
    status === "FINISHED" && homeScore != null && awayScore != null;
  const actual: Pick | null = finished
    ? homeScore! > awayScore!
      ? "H"
      : homeScore! < awayScore!
        ? "A"
        : "D"
    : null;

  const choose = (p: Pick) => {
    if (finished) return;
    const next = pick === p ? null : p;
    setPick(next);
    try {
      if (next) localStorage.setItem(`pred:${matchId}`, next);
      else localStorage.removeItem(`pred:${matchId}`);
    } catch {
      /* noop */
    }
  };

  // ハイドレーション不一致回避：読み込み前はニュートラル表示
  const btn = (p: Pick, label: string) => {
    const selected = loaded && pick === p;
    const isActual = actual === p;
    let cls =
      "flex-1 rounded-lg py-1.5 px-1 text-xs font-bold border transition-colors ";
    if (finished) {
      cls += isActual
        ? "bg-[#4caf50] text-white border-[#4caf50] "
        : selected
          ? "bg-jpred/10 text-jpred border-jpred/40 line-through "
          : "bg-surface text-muted border-line ";
    } else {
      cls += selected
        ? "bg-jpnavy text-white border-jpnavy "
        : "bg-surface text-foreground border-jpnavy/30 cursor-pointer hover:border-jpnavy hover:bg-jpnavy/5 active:bg-jpnavy/10 ";
    }
    return (
      <button
        type="button"
        onClick={() => choose(p)}
        disabled={finished}
        className={cls}
        aria-pressed={selected}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      {!compact && (
        <div className="text-[11px] font-bold text-muted mb-1.5 flex items-center gap-1">
          <span aria-hidden>🔮</span>
          あなたの勝敗予想
          {!finished && (
            <span className="font-normal text-muted/80">（タップで選ぶ）</span>
          )}
          {finished && pick && (
            <span
              className={`ml-auto font-bold ${
                pick === actual ? "text-[#4caf50]" : "text-jpred"
              }`}
            >
              {pick === actual ? "的中！" : "はずれ"}
            </span>
          )}
        </div>
      )}
      <div className="flex gap-1.5">
        {btn("H", `${homeFlag} 勝`)}
        {btn("D", "引分")}
        {btn("A", `${awayFlag} 勝`)}
      </div>
    </div>
  );
}
