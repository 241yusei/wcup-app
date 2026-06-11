"use client";
// 深夜観戦モード切替。FotMob/Sofascore等の競合は全てダークモード搭載済み。
// 深夜・早朝キックオフが中核体験のこのアプリでは必須機能と位置づける。
// 初期適用は layout.tsx のインラインスクリプト（FOUC防止）、ここは切替UIのみ担当。

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* noop */
    }
    setDark(next);
  };

  return (
    <button
      onClick={toggle}
      className="h-9 w-9 rounded-full border border-line bg-surface flex items-center justify-center text-base hover:border-jpnavy/50 transition-colors shrink-0"
      title={dark ? "ライトモードに戻す" : "深夜観戦モード（ダーク）"}
      aria-label={dark ? "ライトモードに戻す" : "深夜観戦モードに切り替え"}
    >
      {dark === null ? "🌗" : dark ? "☀️" : "🌙"}
    </button>
  );
}
