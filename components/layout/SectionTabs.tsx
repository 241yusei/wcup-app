"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// セクション内の横断タブ（例: 試合ハブ＝日程/順位表/決勝T/得点王/会場）。
// 関連ページを1つの「ハブ」として束ね、情報設計の見通しを良くするための共通部品。
export interface TabItem {
  href: string;
  label: string;
  icon?: string;
}

export default function SectionTabs({
  items,
  title,
}: {
  items: TabItem[];
  title?: string;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === pathname || (href !== "/" && pathname.startsWith(href));

  return (
    <div className="mb-6">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          <span className="text-xs font-bold text-muted tracking-wide">{title}</span>
        </div>
      )}
      <nav className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
        {items.map((t) => {
          const active = isActive(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                active
                  ? "bg-jpnavy text-white border-jpnavy"
                  : "bg-surface text-muted border-line hover:text-jpnavy hover:border-jpnavy/40"
              }`}
            >
              {t.icon && <span aria-hidden>{t.icon}</span>}
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// 試合ハブのタブ定義（複数ページで共有）。
export const MATCH_TABS: TabItem[] = [
  { href: "/schedule", label: "日程", icon: "📅" },
  { href: "/groups", label: "順位表", icon: "📊" },
  { href: "/bracket", label: "決勝T", icon: "🏆" },
  { href: "/stats", label: "得点王", icon: "👟" },
  { href: "/venues", label: "会場", icon: "🏟" },
];

// 日本ハブのタブ定義。
export const JAPAN_TABS: TabItem[] = [
  { href: "/japan", label: "特集・突破条件", icon: "🇯🇵" },
  { href: "/squad", label: "代表メンバー", icon: "📋" },
];
