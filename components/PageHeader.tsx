import { ReactNode } from "react";

// ページ最上部の見出しを統一するコンポーネント。
// 「ブランドのストライプ → 居場所を示すeyebrow → 大きなタイトル → 説明」の順で、
// どのページでも視線の入口を一定にする（深津流・迷わせない情報設計）。
export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`mb-8 flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="colors-stripe-thin w-10 rounded-full" />
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {title}
        </h1>
        {description && (
          <div className="text-muted text-sm leading-relaxed max-w-prose">
            {description}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
