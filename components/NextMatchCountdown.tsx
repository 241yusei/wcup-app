"use client";
import { useEffect, useState } from "react";

// 次の試合までのカウントダウン。targetUtcはISO文字列。
export default function NextMatchCountdown({
  targetUtc,
  label,
}: {
  targetUtc: string;
  label: string; // 例: "次の日本戦：日本 vs オランダ"
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  // SSR/初期はニュートラル（ハイドレーション不一致回避）
  if (now === null) {
    return (
      <div className="rounded-xl bg-white/10 px-3 py-2 text-sm">
        <span className="font-bold">{label}</span>
      </div>
    );
  }

  const target = new Date(targetUtc).getTime();
  const diff = target - now;
  const live = diff <= 0 && diff > -1000 * 60 * 120; // 開始〜2時間はLIVE扱い

  let body: React.ReactNode;
  if (live) {
    body = <span className="font-extrabold text-base">🔴 まもなく／開催中</span>;
  } else if (diff <= 0) {
    body = <span className="font-bold">試合は終了予定の時間です</span>;
  } else {
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    body = (
      <span className="font-extrabold tabular-nums text-base">
        あと {d > 0 && `${d}日 `}
        {h}時間 {m}分
      </span>
    );
  }

  return (
    <div className="rounded-xl bg-white/10 px-3 py-2">
      <div className="text-[11px] text-white/80">{label}</div>
      {body}
    </div>
  );
}
