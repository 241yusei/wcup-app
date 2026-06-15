import { ReactNode } from "react";

// セクション見出しの統一パターン（eyebrow＋タイトル＋任意のアクション）。
// 装飾を抑え、「小さなラベル → 太い見出し」で視線の入口を一点に絞る。
export default function SectionHeader({
  eyebrow,
  title,
  action,
  accent = "navy",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
  accent?: "navy" | "red" | "none";
  className?: string;
}) {
  const bar =
    accent === "red"
      ? "bg-jpred"
      : accent === "navy"
      ? "bg-jpnavy"
      : "";
  return (
    <div className={`flex items-end justify-between gap-3 mb-5 ${className}`}>
      <div className="min-w-0">
        {eyebrow && (
          <div className="flex items-center gap-2 mb-1.5">
            {bar && <span className={`h-3.5 w-1 rounded-full ${bar}`} />}
            <span className="eyebrow">{eyebrow}</span>
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {action && <div className="shrink-0 pb-0.5">{action}</div>}
    </div>
  );
}
