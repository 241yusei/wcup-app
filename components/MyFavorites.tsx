"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jstDateLabel, jstTimeLabel } from "@/lib/datetime";
import LiveBadge from "@/components/LiveBadge";

const KEY = "fav:teams";

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

// ホームに渡す軽量な試合情報。
export interface FavMatch {
  id: string;
  homeCode: string;
  awayCode: string;
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "FINISHED";
  stage: string;
  city?: string;
}

// ホームの「マイ推し」ストリップ。推し登録した国のチップ＋推し国の次の試合。
export default function MyFavorites({
  teamMap,
  matches = [],
}: {
  teamMap: Record<string, { name: string; flag: string }>;
  matches?: FavMatch[];
}) {
  const [codes, setCodes] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sync = () => setCodes(read());
    sync();
    setLoaded(true);
    window.addEventListener("fav-changed", sync);
    return () => window.removeEventListener("fav-changed", sync);
  }, []);

  if (!loaded || codes.length === 0) return null;
  const valid = codes.filter((c) => teamMap[c]);
  if (valid.length === 0) return null;
  const favSet = new Set(valid);

  // 推し国が関わる、これからの試合（最大5件）。
  const upcoming = matches
    .filter(
      (m) =>
        m.status !== "FINISHED" &&
        (favSet.has(m.homeCode) || favSet.has(m.awayCode))
    )
    .sort((a, b) => +new Date(a.utcDate) - +new Date(b.utcDate))
    .slice(0, 5);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-8">
      <div className="rounded-2xl border border-[#e8c30c]/40 bg-[#e8c30c]/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg" aria-hidden>
            ⭐
          </span>
          <h2 className="font-bold">あなたの推し</h2>
          <span className="text-xs text-muted">{valid.length}カ国</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {valid.map((c) => (
            <Link
              key={c}
              href={`/teams/${c}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-line px-3 py-1.5 text-sm font-medium hover:border-jpnavy transition-colors"
            >
              <span className="text-base">{teamMap[c].flag}</span>
              {teamMap[c].name}
            </Link>
          ))}
        </div>

        {/* 推し国の次の試合 */}
        {upcoming.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#e8c30c]/30">
            <div className="text-xs font-bold text-muted mb-2">
              ⚽ 推し国の次の試合
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {upcoming.map((m) => {
                const h = teamMap[m.homeCode];
                const a = teamMap[m.awayCode];
                return (
                  <Link
                    key={m.id}
                    href={`/matches/${m.id}`}
                    className="flex items-center gap-2 rounded-xl bg-surface border border-line px-3 py-2 hover:border-jpnavy/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-sm font-bold">
                        <span>{h?.flag ?? "🏳️"}</span>
                        <span className="truncate">{h?.name ?? m.homeCode}</span>
                        <span className="text-xs text-muted">vs</span>
                        <span>{a?.flag ?? "🏳️"}</span>
                        <span className="truncate">{a?.name ?? m.awayCode}</span>
                      </div>
                      <div className="text-[11px] text-muted mt-0.5">
                        {jstDateLabel(m.utcDate)} {jstTimeLabel(m.utcDate)} JST
                        {m.city && `・${m.city}`}
                      </div>
                    </div>
                    <LiveBadge utcDate={m.utcDate} status={m.status} />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
