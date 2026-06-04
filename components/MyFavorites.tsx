"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "fav:teams";

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

// ホームの「マイ推し」ストリップ。推し登録した国をチップで表示。
export default function MyFavorites({
  teamMap,
}: {
  teamMap: Record<string, { name: string; flag: string }>;
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
      </div>
    </section>
  );
}
