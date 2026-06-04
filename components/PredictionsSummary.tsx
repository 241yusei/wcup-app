"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShareButton from "@/components/ShareButton";

type Pick = "H" | "D" | "A";

export interface PredMatch {
  id: string;
  stage: string;
  homeFlag: string;
  awayFlag: string;
  homeName: string;
  awayName: string;
  status: string;
  homeScore?: number | null;
  awayScore?: number | null;
}

function actualOf(m: PredMatch): Pick | null {
  if (m.status !== "FINISHED" || m.homeScore == null || m.awayScore == null)
    return null;
  return m.homeScore > m.awayScore ? "H" : m.homeScore < m.awayScore ? "A" : "D";
}

function label(m: PredMatch, p: Pick) {
  if (p === "H") return `${m.homeFlag} ${m.homeName}`;
  if (p === "A") return `${m.awayFlag} ${m.awayName}`;
  return "引き分け";
}

export default function PredictionsSummary({ matches }: { matches: PredMatch[] }) {
  const [picks, setPicks] = useState<Record<string, Pick>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const next: Record<string, Pick> = {};
    try {
      for (const m of matches) {
        const v = localStorage.getItem(`pred:${m.id}`);
        if (v === "H" || v === "D" || v === "A") next[m.id] = v;
      }
    } catch {
      /* noop */
    }
    setPicks(next);
    setLoaded(true);
  }, [matches]);

  if (!loaded) {
    return <p className="text-sm text-muted">読み込み中…</p>;
  }

  const predicted = matches.filter((m) => picks[m.id]);
  const settled = predicted.filter((m) => actualOf(m) !== null);
  const hits = settled.filter((m) => picks[m.id] === actualOf(m));
  const rate = settled.length ? Math.round((hits.length / settled.length) * 100) : null;

  if (predicted.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center">
        <div className="text-3xl mb-2">🔮</div>
        <p className="text-sm text-muted leading-relaxed mb-4">
          まだ予想がありません。試合カードの「勝敗予想」ボタンで予想すると、
          ここに一覧と的中率が貯まります。
        </p>
        <Link
          href="/schedule"
          className="inline-block px-5 py-2.5 rounded-full bg-jpnavy text-white font-medium text-sm"
        >
          試合日程で予想する →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* サマリー */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-line bg-surface p-4 text-center">
          <div className="text-2xl font-extrabold text-jpnavy">{predicted.length}</div>
          <div className="text-xs text-muted mt-0.5">予想した試合</div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4 text-center">
          <div className="text-2xl font-extrabold text-[#4caf50]">{hits.length}</div>
          <div className="text-xs text-muted mt-0.5">的中</div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4 text-center">
          <div className="text-2xl font-extrabold text-jpred">
            {rate == null ? "—" : `${rate}%`}
          </div>
          <div className="text-xs text-muted mt-0.5">的中率</div>
        </div>
      </div>

      {/* シェア */}
      <div className="mb-6 flex justify-center">
        <ShareButton
          label="予想成績をシェア"
          text={
            rate == null
              ? `🔮 W杯の勝敗予想に挑戦中！${predicted.length}試合を予想したよ。あなたも予想しよう #100倍Wカップ #FIFAワールドカップ`
              : `🔮 W杯勝敗予想の的中率は${rate}%（${settled.length}試合中${hits.length}的中）！あなたも予想で勝負しよう #100倍Wカップ #FIFAワールドカップ`
          }
        />
      </div>

      {/* 一覧 */}
      <div className="space-y-2">
        {predicted.map((m) => {
          const p = picks[m.id];
          const a = actualOf(m);
          const settledHit = a !== null ? p === a : null;
          return (
            <Link
              key={m.id}
              href={`/matches/${m.id}`}
              className="block rounded-xl border border-line bg-surface p-3 hover:border-jpnavy transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] text-muted">{m.stage}</div>
                  <div className="text-sm font-medium truncate">
                    {m.homeFlag} {m.homeName}{" "}
                    <span className="text-muted text-xs">vs</span> {m.awayFlag}{" "}
                    {m.awayName}
                  </div>
                  <div className="text-xs mt-0.5">
                    予想：<span className="font-bold">{label(m, p)}</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  {a === null ? (
                    <span className="text-[10px] text-muted">結果待ち</span>
                  ) : settledHit ? (
                    <span className="text-xs font-bold text-[#4caf50]">的中 ✓</span>
                  ) : (
                    <span className="text-xs font-bold text-jpred">はずれ</span>
                  )}
                  {a !== null && (
                    <div className="text-sm font-bold tabular-nums">
                      {m.homeScore} - {m.awayScore}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
