import Link from "next/link";
import { getMatches } from "@/lib/football";
import { computeStandings, hasResults, type Row } from "@/lib/standings";
import { getTeam } from "@/data/teams";
import SectionTabs, { MATCH_TABS } from "@/components/layout/SectionTabs";


export const metadata = {
  title: "グループ順位表｜全12組の組み合わせと勝点｜100倍Wカップ",
  description:
    "2026ワールドカップ全12組（A〜L）の組み合わせと順位表。勝点・得失点差をリアルタイム反映。各組上位2チーム＋成績上位の3位8チームがラウンド32へ。日本のグループFも一目で。",
};

const groupLetters = "ABCDEFGHIJKL".split("");

function StandingRow({
  row,
  rank,
}: {
  row: Row;
  rank: number;
}) {
  const t = getTeam(row.code);
  const isJp = row.code === "JPN";
  // 1-2位＝突破濃厚（緑）、3位＝3位枠の可能性（黄）
  const band =
    rank <= 2 ? "border-l-4 border-l-[#4caf50]" : rank === 3 ? "border-l-4 border-l-[#e8c30c]" : "border-l-4 border-l-transparent";
  return (
    <tr className={`${band} ${isJp ? "bg-jpred/5" : ""}`}>
      <td className="py-1.5 pl-2 pr-1 text-xs text-muted tabular-nums w-6">{rank}</td>
      <td className="py-1.5 pr-2">
        <Link
          href={t ? `/teams/${row.code}` : "#"}
          className="flex items-center gap-1.5 hover:underline"
        >
          <span className="text-base">{t?.flag ?? "🏳️"}</span>
          <span className={`text-sm ${isJp ? "font-bold text-jpred" : "font-medium"} truncate`}>
            {t?.name ?? row.code}
          </span>
        </Link>
      </td>
      <td className="py-1.5 px-1 text-center text-xs tabular-nums">{row.P}</td>
      <td className="py-1.5 px-1 text-center text-xs tabular-nums hidden sm:table-cell">{row.W}</td>
      <td className="py-1.5 px-1 text-center text-xs tabular-nums hidden sm:table-cell">{row.D}</td>
      <td className="py-1.5 px-1 text-center text-xs tabular-nums hidden sm:table-cell">{row.L}</td>
      <td className="py-1.5 px-1 text-center text-xs tabular-nums">
        {row.GD > 0 ? `+${row.GD}` : row.GD}
      </td>
      <td className="py-1.5 pl-1 pr-2 text-center text-sm font-bold tabular-nums">{row.Pts}</td>
    </tr>
  );
}

export default async function GroupsPage() {
  const { matches, live } = await getMatches();
  const standings = computeStandings(matches);
  const started = hasResults(matches);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="colors-stripe-thin w-16 rounded-full mb-3" />
          <h1 className="text-3xl font-bold mb-1">グループ順位表</h1>
          <p className="text-muted text-sm leading-relaxed">
            全12組（A〜L）の組み合わせと勝点。
            {started
              ? "結果をリアルタイム反映中。"
              : "開幕までは組み合わせ表として表示します。"}
          </p>
        </div>
      </header>

      <SectionTabs items={MATCH_TABS} title="試合" />

      {/* 突破ルールの凡例 */}
      <div className="rounded-xl border border-line bg-surface p-3 mb-6 text-xs text-muted flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#4caf50]" />
          上位2位＝ラウンド32へ自動突破
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#e8c30c]" />
          3位＝成績上位8チームなら突破
        </span>
        <span className="ml-auto text-[11px]">
          {live ? "🟢 ライブ" : "📋 サンプル"}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {groupLetters.map((g) => {
          const rows = standings[g];
          if (!rows || rows.length === 0) return null;
          const hasJp = rows.some((r) => r.code === "JPN");
          return (
            <section
              key={g}
              className={`rounded-2xl border bg-surface overflow-hidden ${
                hasJp ? "border-jpred ring-1 ring-jpred/20" : "border-line"
              }`}
            >
              <div
                className={`px-4 py-2 flex items-center gap-2 ${
                  hasJp ? "bg-jpred text-white" : "bg-jpnavy text-white"
                }`}
              >
                <span className="text-sm font-bold">グループ {g}</span>
                {hasJp && (
                  <span className="text-[10px] font-bold bg-white/20 rounded-full px-2 py-0.5">
                    🇯🇵 日本
                  </span>
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] text-muted border-b border-line">
                    <th className="py-1 pl-2 font-medium text-left w-6"></th>
                    <th className="py-1 font-medium text-left">国</th>
                    <th className="py-1 px-1 font-medium">試</th>
                    <th className="py-1 px-1 font-medium hidden sm:table-cell">勝</th>
                    <th className="py-1 px-1 font-medium hidden sm:table-cell">分</th>
                    <th className="py-1 px-1 font-medium hidden sm:table-cell">負</th>
                    <th className="py-1 px-1 font-medium">得失</th>
                    <th className="py-1 pr-2 font-medium">点</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((r, i) => (
                    <StandingRow key={r.code} row={r} rank={i + 1} />
                  ))}
                </tbody>
              </table>
            </section>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link href="/bracket" className="text-sm font-bold text-jpnavy hover:underline">
          🏆 決勝トーナメント早見 →
        </Link>
        <Link href="/japan" className="text-sm font-medium text-jpnavy hover:underline">
          🇯🇵 日本特集（突破条件）→
        </Link>
        <Link href="/schedule" className="text-sm font-medium text-jpnavy hover:underline">
          🗓 全試合の日程 →
        </Link>
      </div>
    </div>
  );
}
