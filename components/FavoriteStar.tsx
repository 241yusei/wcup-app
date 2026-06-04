"use client";
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

// 推し国のお気に入り登録スター。localStorageに保存し、'fav-changed'イベントで同期。
export default function FavoriteStar({
  code,
  withLabel = false,
}: {
  code: string;
  withLabel?: boolean;
}) {
  const [on, setOn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sync = () => setOn(read().includes(code));
    sync();
    setLoaded(true);
    window.addEventListener("fav-changed", sync);
    return () => window.removeEventListener("fav-changed", sync);
  }, [code]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let arr = read();
    arr = arr.includes(code) ? arr.filter((c) => c !== code) : [...arr, code];
    try {
      localStorage.setItem(KEY, JSON.stringify(arr));
    } catch {
      /* noop */
    }
    setOn(arr.includes(code));
    window.dispatchEvent(new Event("fav-changed"));
  };

  const active = loaded && on;

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={active}
        className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border transition-colors ${
          active
            ? "bg-[#e8c30c] text-jpnavy border-[#e8c30c]"
            : "bg-surface text-muted border-line hover:border-[#e8c30c]"
        }`}
      >
        <span aria-hidden>{active ? "★" : "☆"}</span>
        {active ? "推しに登録中" : "推しに登録"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? "推し解除" : "推しに登録"}
      title={active ? "推し解除" : "推しに登録"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-xl leading-none shadow-sm transition-transform hover:scale-110 active:scale-95 ${
        active
          ? "bg-[#e8c30c] text-jpnavy"
          : "bg-background/80 text-muted/70 hover:text-[#e8c30c]"
      }`}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
