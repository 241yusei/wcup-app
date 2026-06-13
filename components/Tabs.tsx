"use client";
import { useState } from "react";

// ページ内タブ。全パネルをDOMに描画し、非アクティブを hidden で隠す
// （静的書き出しでも全文がHTMLに含まれ、検索・SEO・アンカーが効く）。
export interface TabDef {
  label: string;
  icon?: string;
  panel: React.ReactNode;
}

export default function Tabs({
  tabs,
  initial = 0,
}: {
  tabs: TabDef[];
  initial?: number;
}) {
  const [active, setActive] = useState(initial);

  return (
    <div>
      <div
        role="tablist"
        className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1 mb-6 sticky top-16 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-1"
      >
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.label}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                on
                  ? "bg-jpnavy text-white border-jpnavy"
                  : "bg-surface text-muted border-line hover:text-jpnavy hover:border-jpnavy/40"
              }`}
            >
              {t.icon && <span aria-hidden>{t.icon}</span>}
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" hidden={i !== active}>
          {t.panel}
        </div>
      ))}
    </div>
  );
}
