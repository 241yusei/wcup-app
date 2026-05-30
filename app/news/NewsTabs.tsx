"use client";
import { useState } from "react";
import { NewsItem } from "@/lib/types";

export default function NewsTabs({ items }: { items: NewsItem[] }) {
  const [tab, setTab] = useState<"all" | "serious" | "fun">("all");
  const filtered = items.filter((n) => tab === "all" || n.category === tab);

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "all", label: "すべて" },
    { key: "serious", label: "📰 真面目" },
    { key: "fun", label: "🎉 面白" },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-jpnavy text-white"
                : "bg-surface border border-line text-muted hover:text-jpnavy"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((n) => {
          const external = n.sourceUrl.startsWith("http");
          return (
            <a
              key={n.id}
              href={n.sourceUrl}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="block bg-surface border border-line rounded-2xl p-5 hover:border-jpnavy transition-colors"
            >
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span
                  className={`px-2 py-0.5 rounded-full font-medium ${
                    n.category === "fun"
                      ? "bg-jpred/10 text-jpred"
                      : "bg-jpnavy/10 text-jpnavy"
                  }`}
                >
                  {n.category === "fun" ? "面白" : "真面目"}
                </span>
                {n.tag && <span className="text-muted">#{n.tag}</span>}
                <span className="text-muted ml-auto">{n.date}</span>
              </div>
              <h3 className="font-bold leading-snug mb-1">{n.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{n.summary}</p>
              <p className="text-xs text-muted mt-2">
                出典：{n.sourceName} {external ? "↗" : ""}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
