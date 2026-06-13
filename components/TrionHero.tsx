"use client";
// メインキャラクター「トリオン」のヒーロー。
// Duolingoのキャラ設計に倣い「毎日そこにいて、時間に応じて話しかけてくる」案内人にする。
// 時間帯別の挨拶 + 次の日本戦カウントダウン + トリオンの一言を吹き出しで表示。

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface TrionHeroData {
  matchId: string;
  oppName: string;
  oppFlag: string;
  dateLabel: string; // "6/15(月)"
  timeLabel: string; // "05:00"
  utcDate: string;
  comment: string; // judgeWake のトリオンの一言
}

function greetingByHour(h: number): string {
  if (h < 5) return "……まだ起きてるのか。いい根性だ。";
  if (h < 10) return "おはよう。早起きは観戦力だぜ。";
  if (h < 18) return "よう、来たな。";
  return "こんばんは。今夜も付き合うぜ。";
}

export default function TrionHero({ data }: { data?: TrionHeroData }) {
  // SSRとのハイドレーション不一致を避けるため、時刻依存の文言はマウント後に出す
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  let countdown: string | null = null;
  if (data && now) {
    const diff = +new Date(data.utcDate) - +now;
    if (diff > 0) {
      const d = Math.floor(diff / 86_400_000);
      const h = Math.floor((diff % 86_400_000) / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      countdown =
        d > 0 ? `あと${d}日${h}時間` : h > 0 ? `あと${h}時間${m}分` : `あと${m}分`;
    }
  }

  return (
    <div className="flex flex-col items-center md:items-end gap-0">
      {/* 吹き出し */}
      <div className="relative w-full max-w-sm rounded-2xl border-2 border-jpnavy bg-surface p-4 shadow-md">
        <p className="text-sm font-bold text-jpnavy mb-1.5">
          {now ? greetingByHour(now.getHours()) : "よう、来たな。"}
        </p>
        {data ? (
          <>
            <p className="text-sm leading-relaxed">
              次の日本戦は{" "}
              <span className="font-bold">
                {data.oppFlag} {data.oppName}
              </span>{" "}
              戦。
              <span className="font-mono font-bold">
                {data.dateLabel} {data.timeLabel}
              </span>
              {countdown && (
                <span className="ml-1 inline-block rounded-full bg-jpred text-white text-xs font-bold px-2 py-0.5 align-middle">
                  ⏰ {countdown}
                </span>
              )}
            </p>
            <p className="text-xs text-muted leading-relaxed mt-2 border-l-2 border-jpred pl-2">
              {data.comment}
            </p>
            <Link
              href={`/matches/${data.matchId}`}
              className="mt-3 inline-block text-xs font-bold text-jpnavy underline underline-offset-4"
            >
              この一戦の因縁を読む →
            </Link>
          </>
        ) : (
          <p className="text-sm leading-relaxed">
            ここに来りゃ、W杯は100倍になる。まずは下から好きなページを選びな。
          </p>
        )}
        {/* 吹き出しのしっぽ */}
        <span
          className="absolute -bottom-[10px] left-1/2 md:left-auto md:right-16 -translate-x-1/2 md:translate-x-0 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-jpnavy"
          aria-hidden
        />
      </div>

      {/* トリオン本体 */}
      <Link href="/guide" className="group relative mt-2" title="トリオンの玄人解説">
        <div className="absolute inset-0 bg-jpnavy/5 rounded-full blur-3xl" />
        <Image
          src="/trion.png"
          alt="トリオン"
          width={260}
          height={396}
          priority
          className="relative drop-shadow-2xl transition-transform group-hover:scale-105"
        />
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-jpnavy bg-surface/90 border border-line rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          🐾 トリオンの玄人解説へ
        </span>
      </Link>
    </div>
  );
}
