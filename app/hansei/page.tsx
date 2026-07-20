import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Tabs from "@/components/Tabs";
import {
  hanseiMeta,
  hanseiIssues,
  hanseiSummaries,
  HanseiIssue,
  HanseiCategory,
} from "@/data/hansei";

export const metadata = {
  title: "100倍反省会｜2026年W杯の問題・課題を総括する｜100倍Wカップ",
  description:
    "2026ワールドカップで起きた問題と課題を、問題点・理由・改善案・考察の4段で独自総括。酷暑、チケット高騰、VAR混乱、政治介入、アジア勢全滅、そして日本代表の反省まで、世界中の報道と声をもとに徹底検証。",
};

// ─── 反省会カード：問題点→理由→改善案→考察の4段構造 ─────────────
function IssueCard({ issue }: { issue: HanseiIssue }) {
  return (
    <article className="rounded-2xl border border-line bg-surface overflow-hidden">
      {/* 見出し */}
      <div className="px-4 pt-4 pb-3 border-b border-line">
        <div className="flex items-start gap-2.5">
          <span className="text-2xl shrink-0" aria-hidden>
            {issue.icon}
          </span>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-muted tracking-wide">
              {issue.category}
            </span>
            <h3 className="font-bold leading-snug">{issue.title}</h3>
          </div>
        </div>
      </div>

      {/* 4段ブロック */}
      <div className="p-4 space-y-4 text-sm leading-relaxed">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold text-jpred mb-1">
            <span aria-hidden>🔴</span> 問題点
          </p>
          <p className="text-foreground/90">{issue.problem}</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold text-jpnavy mb-1">
            <span aria-hidden>🔍</span> 理由・背景
          </p>
          <p className="text-foreground/90">{issue.reason}</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1">
            <span aria-hidden>💡</span> 改善案
          </p>
          <p className="text-foreground/90">{issue.improvement}</p>
        </div>
        <div className="rounded-xl bg-jpnavy/[0.04] border border-jpnavy/15 p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold text-jpnavy mb-1">
            <span aria-hidden>🧠</span> 編集部の考察
          </p>
          <p className="text-foreground/90">{issue.analysis}</p>
        </div>

        {/* 世界の声 */}
        {issue.voices && issue.voices.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold text-muted mb-2">
              <span aria-hidden>🌍</span> 世界の声
            </p>
            <ul className="space-y-2">
              {issue.voices.map((v) => (
                <li
                  key={v.who + v.quote.slice(0, 8)}
                  className="border-l-2 border-line pl-3"
                >
                  <p className="text-[13px] text-foreground/85">「{v.quote}」</p>
                  <p className="text-[11px] text-muted mt-0.5">— {v.who}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

function IssueList({ category }: { category: HanseiCategory | "all" }) {
  const items =
    category === "all"
      ? hanseiIssues
      : hanseiIssues.filter((i) => i.category === category);
  return (
    <div className="space-y-5">
      {items.map((i) => (
        <IssueCard key={i.id} issue={i} />
      ))}
    </div>
  );
}

// ─── 総括パネル ────────────────────────────────────────────────
function SummaryPanel() {
  return (
    <div className="space-y-5">
      {hanseiSummaries.map((s) => (
        <article
          key={s.title}
          className="rounded-2xl border-2 border-jpnavy/30 bg-surface p-5"
        >
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span aria-hidden>📜</span>
            {s.title}
          </h3>
          <p className="text-sm leading-relaxed text-foreground/90">{s.body}</p>
        </article>
      ))}
      <div className="rounded-xl border border-line bg-surface/60 p-4 text-xs text-muted">
        <p className="font-bold text-foreground mb-1.5">🔎 このページについて</p>
        <p>{hanseiMeta.caveat}</p>
        <p className="mt-1">最終更新：{hanseiMeta.asOf}</p>
      </div>
    </div>
  );
}

// ─── ページ本体 ────────────────────────────────────────────────
export default function HanseiPage() {
  const counts = {
    operations: hanseiIssues.filter((i) => i.category === "大会運営").length,
    rules: hanseiIssues.filter((i) => i.category === "競技・ルール").length,
    structure: hanseiIssues.filter((i) => i.category === "構造・格差").length,
    japan: hanseiIssues.filter((i) => i.category === "日本代表").length,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <PageHeader
        eyebrow="考察"
        title="100倍反省会"
        description={hanseiMeta.intro}
      />

      {/* サマリーバー */}
      <div className="mb-6 rounded-xl border border-line bg-surface p-3 text-xs flex flex-wrap gap-x-4 gap-y-1">
        <span className="font-bold text-jpnavy">
          検証テーマ：全{hanseiIssues.length}項目
        </span>
        <span className="text-muted">大会運営 {counts.operations}</span>
        <span className="text-muted">競技・ルール {counts.rules}</span>
        <span className="text-muted">構造・格差 {counts.structure}</span>
        <span className="text-muted">日本代表 {counts.japan}</span>
      </div>

      <Tabs
        tabs={[
          {
            label: "大会運営",
            icon: "🏟️",
            panel: <IssueList category="大会運営" />,
          },
          {
            label: "競技・ルール",
            icon: "🟥",
            panel: <IssueList category="競技・ルール" />,
          },
          {
            label: "構造・格差",
            icon: "🌏",
            panel: <IssueList category="構造・格差" />,
          },
          {
            label: "日本代表の反省",
            icon: "🇯🇵",
            panel: <IssueList category="日本代表" />,
          },
          { label: "編集部総括", icon: "📜", panel: <SummaryPanel /> },
        ]}
      />

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/bracket" className="text-sm font-bold text-jpnavy hover:underline">
          🏆 決勝トーナメント全結果 →
        </Link>
        <Link href="/japan" className="text-sm font-medium text-jpnavy hover:underline">
          🇯🇵 日本特集 →
        </Link>
        <Link href="/news" className="text-sm font-medium text-jpnavy hover:underline">
          📰 ニュース →
        </Link>
      </div>
    </div>
  );
}
