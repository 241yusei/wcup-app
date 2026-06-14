import Link from "next/link";
import SectionTabs, { MATCH_TABS } from "@/components/layout/SectionTabs";
import { getTeam } from "@/data/teams";
import { getScorers } from "@/lib/football";
import {
  currentScorers,
  goldenBootContenders,
  scorerMeta,
} from "@/data/scorers";

export const metadata = {
  title: "得点ランキング（ゴールデンブーツ）｜100倍Wカップ",
  description:
    "2026ワールドカップの得点王レース。現時点の得点ランキングと、大会前評価によるゴールデンブーツ本命ウォッチリスト。誰が得点王になるかを追いかけよう。",
};

function Flag({ code }: { code: string }) {
  return <span className="text-xl">{getTeam(code)?.flag ?? "🏳️"}</span>;
}

export default async function StatsPage() {
  // APIキーがあれば実際の得点ランキングを取得、なければフォールバック表示。
  const { scorers, live } = await getScorers();
  const ranking = live
    ? scorers.map((s) => ({
        player: s.player,
        teamCode: s.teamCode,
        goals: s.goals,
        assists: s.assists,
        note: undefined as string | undefined,
      }))
    : currentScorers.map((s) => ({
        player: s.player,
        teamCode: s.teamCode,
        goals: s.goals,
        assists: undefined as number | undefined,
        note: s.note,
      }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-6">
        <div className="colors-stripe-thin w-16 rounded-full mb-3" />
        <h1 className="text-3xl font-bold mb-1">得点ランキング</h1>
        <p className="text-muted text-sm leading-relaxed">
          得点王（ゴールデンブーツ）レースを追いかけよう。
          <span className="block text-[11px] mt-1">
            ※ {live ? "公式スタッツを反映中（自動更新）" : scorerMeta.asOf}
          </span>
        </p>
      </header>

      <SectionTabs items={MATCH_TABS} title="試合" />

      {/* 注意書き（フォールバック時のみ） */}
      {!live && (
        <div className="rounded-xl border border-jpnavy/30 bg-jpnavy/[0.04] p-3.5 mb-6 flex gap-2.5">
          <span className="text-lg shrink-0" aria-hidden>
            ℹ️
          </span>
          <p className="text-xs text-muted leading-relaxed">{scorerMeta.caveat}</p>
        </div>
      )}

      {/* 得点ランキング */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          {live ? "得点ランキング" : "現在の得点（暫定）"}
          {live && (
            <span className="text-[10px] font-bold bg-[#4caf50] text-white rounded-full px-2 py-0.5">
              LIVE
            </span>
          )}
        </h2>
        <div className="space-y-2">
          {ranking.map((s, i) => (
            <div
              key={`${s.player}-${i}`}
              className="rounded-xl border border-line bg-surface p-3 flex items-center gap-3"
            >
              <span
                className={`w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center shrink-0 ${
                  i === 0
                    ? "bg-[#e8c30c] text-white"
                    : "bg-jpnavy/10 text-jpnavy"
                }`}
              >
                {i + 1}
              </span>
              <Flag code={s.teamCode} />
              <div className="flex-1 min-w-0">
                <span className="font-bold text-sm">{s.player}</span>
                {s.note && (
                  <span className="block text-[10px] text-muted leading-tight">
                    {s.note}
                  </span>
                )}
              </div>
              {s.assists != null && (
                <span className="text-xs text-muted">
                  {s.assists}
                  <span className="ml-0.5">アシスト</span>
                </span>
              )}
              <span className="font-mono font-extrabold text-jpred">
                {s.goals}
                <span className="text-xs text-muted font-medium ml-0.5">得点</span>
              </span>
            </div>
          ))}
        </div>
        {!live && (
          <p className="text-[11px] text-muted mt-2">
            試合が進むと選手別の得点ランキングがここに積み上がります。
          </p>
        )}
      </section>

      {/* 本命ウォッチリスト */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          🏅 得点王の本命（大会前評価）
        </h2>
        <p className="text-xs text-muted mb-3">
          誰が得点を量産しそうか、注目のストライカーを予習しておこう。
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {goldenBootContenders.map((c) => {
            const t = getTeam(c.teamCode);
            return (
              <Link
                key={c.player}
                href={t ? `/teams/${c.teamCode}` : "#"}
                className="rounded-2xl border border-line bg-surface p-4 hover:border-jpnavy/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Flag code={c.teamCode} />
                  <span className="font-bold">{c.player}</span>
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-line/70 text-muted">
                    {c.position}
                  </span>
                </div>
                <div className="text-xs text-muted mb-1.5">{t?.name ?? c.teamCode}</div>
                <p className="text-xs leading-relaxed">{c.why}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link href="/schedule" className="text-sm font-bold text-jpnavy hover:underline">
          📅 試合日程を見る →
        </Link>
        <Link href="/teams" className="text-sm font-medium text-jpnavy hover:underline">
          🌍 各国図鑑で選手をチェック →
        </Link>
      </div>
    </div>
  );
}
