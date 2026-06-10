"use client";
// 観たよスタンプ — 試合詳細ページで「この試合を観た」を記録する。
// watched:matches キー（JSON配列）に保存し、/album のコレクションに反映される。

import { useEffect, useState } from "react";

export const WATCHED_KEY = "watched:matches";

export function readWatched(): string[] {
  try {
    const raw = localStorage.getItem(WATCHED_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeWatched(ids: string[]) {
  try {
    localStorage.setItem(WATCHED_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event("watched-changed"));
  } catch {
    /* noop */
  }
}

export default function WatchedStamp({ matchId }: { matchId: string }) {
  const [watched, setWatched] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [justStamped, setJustStamped] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWatched(readWatched().includes(matchId));
  }, [matchId]);

  const toggle = () => {
    const ids = readWatched();
    if (ids.includes(matchId)) {
      writeWatched(ids.filter((i) => i !== matchId));
      setWatched(false);
    } else {
      writeWatched([...ids, matchId]);
      setWatched(true);
      setJustStamped(true);
      setTimeout(() => setJustStamped(false), 1200);
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={watched}
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
        watched
          ? "bg-jpred text-white border-jpred shadow-md"
          : "bg-surface text-jpred border-jpred/40 hover:border-jpred"
      }`}
    >
      <span
        className={`text-lg transition-transform duration-300 ${
          justStamped ? "scale-150 rotate-12" : ""
        }`}
        aria-hidden
      >
        {watched ? "🔴" : "⚪"}
      </span>
      {watched ? "観た！（アルバムに記録済み）" : "観たよスタンプを押す"}
    </button>
  );
}
