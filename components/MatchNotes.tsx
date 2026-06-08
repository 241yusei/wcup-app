"use client";
// 観戦メモ — 試合詳細ページ下部に設置するシンプルなメモ欄。
// note:{matchId} キーに自動保存（localStorage のみ、サーバー送信なし）。
// 「📋 コピー」ボタンで X / Threads の実況投稿にすぐ使える。

import { useState, useEffect, useRef } from "react";

const MAX_LEN = 200;
const KEY = (id: string) => `note:${id}`;

export default function MatchNotes({ matchId }: { matchId: string }) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 保存済みメモを読み込む
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(KEY(matchId));
      if (saved) {
        setText(saved);
        setOpen(true); // メモがあれば開いた状態にする
      }
    } catch { /* noop */ }
  }, [matchId]);

  const handleChange = (val: string) => {
    const clipped = val.slice(0, MAX_LEN);
    setText(clipped);
    // デバウンス保存（500ms）
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        if (clipped) {
          localStorage.setItem(KEY(matchId), clipped);
        } else {
          localStorage.removeItem(KEY(matchId));
        }
      } catch { /* noop */ }
    }, 500);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // フォールバック: input 要素経由でのコピー
    }
  };

  if (!mounted) return null;

  return (
    <section className="mb-10">
      {/* トグルヘッダー */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full text-left mb-3 group"
      >
        <span className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          📝 観戦メモ
        </span>
        <span className="text-xs text-muted ml-2">
          {open ? "▲ 閉じる" : "▼ 開く"}
        </span>
        {!open && text && (
          <span className="text-xs text-jpnavy font-medium ml-1">（メモあり）</span>
        )}
      </button>

      {open && (
        <div className="rounded-xl border border-line bg-surface overflow-hidden">
          <div className="p-3 border-b border-line flex items-center justify-between">
            <p className="text-xs text-muted leading-relaxed">
              観戦中のメモ・感想を残せます。この端末のみに保存されます。
            </p>
            <span className="text-[11px] text-muted ml-2 shrink-0 tabular-nums">
              {text.length} / {MAX_LEN}
            </span>
          </div>

          <textarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`例：「久保の3人抜きが神がかってる」「前半はオランダに押されてる」...\n\n自由にメモ。X / Threads の実況にそのままコピーできます。`}
            rows={5}
            className="w-full bg-transparent px-3 py-3 text-sm leading-relaxed resize-none outline-none placeholder:text-muted/50"
          />

          <div className="px-3 pb-3 flex justify-end gap-2">
            {text && (
              <>
                <button
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    copied
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-surface border border-line text-muted hover:text-jpnavy hover:border-jpnavy"
                  }`}
                >
                  {copied ? "✅ コピーしました！" : "📋 コピーする"}
                </button>
                <button
                  onClick={() => handleChange("")}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-muted hover:text-jpred hover:border-jpred border border-line transition-colors"
                >
                  消去
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
