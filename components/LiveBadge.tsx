"use client";
import { useEffect, useState } from "react";
import { jstDateKey } from "@/lib/datetime";

// リアルタイムの試合ステータスバッジ。クライアントの現在時刻で判定する。
// LIVE（キックオフ〜+durationMin）／まもなく（60分以内）／本日（同JST日）。
// 静的書き出しでもクライアントで時刻判定するため、SSR時は何も出さない。
export default function LiveBadge({
  utcDate,
  status,
  durationMin = 120,
}: {
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "FINISHED";
  durationMin?: number;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  if (now === null || status === "FINISHED") return null;

  const kickoff = new Date(utcDate).getTime();
  const end = kickoff + durationMin * 60000;

  if ((now >= kickoff && now < end) || status === "LIVE") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-jpred rounded-full px-2 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        LIVE
      </span>
    );
  }

  const diff = kickoff - now;
  if (diff > 0 && diff <= 60 * 60000) {
    return (
      <span className="text-[10px] font-bold text-jpred bg-jpred/10 rounded-full px-2 py-0.5">
        まもなく
      </span>
    );
  }

  if (jstDateKey(utcDate) === jstDateKey(new Date(now).toISOString())) {
    return (
      <span className="text-[10px] font-bold text-jpnavy bg-jpnavy/10 rounded-full px-2 py-0.5">
        本日
      </span>
    );
  }

  return null;
}
