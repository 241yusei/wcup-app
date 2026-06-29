import Link from "next/link";
import { getMatches } from "@/lib/football";
import { getTeam } from "@/data/teams";
import { Match } from "@/lib/types";
import { jstDateLabel, jstTimeLabel, jstWatchHint } from "@/lib/datetime";
import SectionTabs, { MATCH_TABS } from "@/components/layout/SectionTabs";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "決勝トーナメント組み合わせ｜ラウンド32全試合・日本の勝ち上がりルート｜100倍Wカップ",
  description:
    "2026ワールドカップ決勝トーナメント。ラウンド32の全16試合の組み合わせと結果、日本代表のブラジル戦から決勝までの勝ち上がりルートを掲載。",
};

// 日本の勝ち上がりルート（ブラジル戦R32 → 決勝まで）
const JAPAN_PATH: { matchId: string; round: string }[] = [
  { matchId: "m-r32-4",  round: "ラウンド32" },
  { matchId: "m-r16-2",  round: "ラウンド16" },
  { matchId: "m-qf-1",   round: "準々決勝" },
  { matchId: "m-sf-1",   round: "準決勝" },
  { matchId: "m-final",  round: "決勝" },
];

// ブラケット構造: R32 ID → R16 ID（地域ブロック別ペアリング）
const R32_TO_R16: Record<string, string> = {
  "m-r32":    "m-r16-1",  // NYNJ: NED vs MAR
  "m-r32-7":  "m-r16-1",  // PHL
  "m-r32-4":  "m-r16-2",  // HOU: BRA vs JPN ← 日本
  "m-r32-2":  "m-r16-2",  // DAL
  "m-r32-3":  "m-r16-3",  // LA: CAN vs RSA
  "m-r32-6":  "m-r16-3",  // SEA
  "m-r32-5":  "m-r16-4",  // ATL: GER vs PAR
  "m-r32-8":  "m-r16-4",  // KAN
  "m-r32-9":  "m-r16-5",  // SF
  "m-r32-10": "m-r16-5",  // MIA
  "m-r32-11": "m-r16-6",  // BOS
  "m-r32-12": "m-r16-6",  // GDL
  "m-r32-13": "m-r16-7",  // MTY
  "m-r32-14": "m-r16-7",  // VAN
  "m-r32-15": "m-r16-8",  // TOR
  "m-r32-16": "m-r16-8",  // AZT
};

const R32_IDS = [
  "m-r32", "m-r32-2", "m-r32-3", "m-r32-4", "m-r32-5",
  "m-r32-6", "m-r32-7", "m-r32-8", "m-r32-9", "m-r32-10",
  "m-r32-11", "m-r32-12", "m-r32-13", "m-r32-14", "m-r32-15", "m-r32-16",
];
const R16_IDS = ["m-r16-1","m-r16-2","m-r16-3","m-r16-4","m-r16-5","m-r16-6","m-r16-7","m-r16-8"];
const QF_IDS  = ["m-qf-1","m-qf-2","m-qf-3","m-qf-4"];
const SF_IDS  = ["m-sf-1","m-sf-2"];

// ─── ヘルパー：チーム表示 ──────────────────────────────────────────
function TeamChip({ code, align = "l" }: { code: string; align?: "l" | "r" }) {
  const t = getTeam(code);
  const isTbd = code === "TBD" || !t;
  return (
    <span
      className={`flex items-center gap-1.5 flex-1 min-w-0 ${
        align === "r" ? "flex-row-reverse text-right" : ""
      } ${isTbd ? "text-muted" : ""}`}
    >
      <span className="text-xl shrink-0">{t?.flag ?? "🏳️"}</span>
      <span className="text-sm font-bold leading-tight truncate">
        {isTbd ? "TBD" : (t?.name ?? code)}
      </span>
    </span>
  );
}

// ─── ヘルパー：勝者の表示 ──────────────────────────────────────────
function WinnerTag({ match }: { match: Match }) {
  if (match.status !== "FINISHED") return null;
  const h = getTeam(match.homeCode);
  const a = getTeam(match.awayCode);
  if (match.homeScore! > match.awayScore!) {
    return (
      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
        {h?.flag} {h?.name ?? match.homeCode} 勝利 →
      </span>
    );
  }
  if (match.awayScore! > match.homeScore!) {
    return (
      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
        {a?.flag} {a?.name ?? match.awayCode} 勝利 →
      </span>
    );
  }
  return (
    <span className="text-[10px] text-muted bg-surface px-1.5 py-0.5 rounded-full border border-line">
      引き分け → PK戦へ
    </span>
  );
}

// ─── ブラケット試合カード ──────────────────────────────────────────
function BracketCard({
  match,
  highlight = false,
}: {
  match: Match | undefined;
  highlight?: boolean;
}) {
  if (!match) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-surface/40 flex items-center justify-center py-5 text-xs text-muted">
        対戦カード未定
      </div>
    );
  }

  const finished = match.status === "FINISHED";
  const hint = jstWatchHint(match.utcDate);
  const isTbd = match.homeCode === "TBD" && match.awayCode === "TBD";

  return (
    <Link
      href={`/matches/${match.id}`}
      className={`block rounded-xl border p-3 hover:border-jpnavy/40 transition-colors ${
        highlight
          ? "border-jpred ring-1 ring-jpred/25 bg-jpred/[0.04]"
          : "border-line bg-surface"
      }`}
    >
      {/* メタ */}
      <div className="flex items-center justify-between text-[10px] text-muted mb-2 gap-2">
        <span className="font-medium shrink-0">
          {jstDateLabel(match.utcDate)} {jstTimeLabel(match.utcDate)} JST
        </span>
        <span className="truncate text-right">
          {match.stadium ? `${match.city}・${match.stadium}` : (match.city ?? match.venue)}
        </span>
      </div>

      {/* スコア */}
      <div className="flex items-center gap-2">
        <TeamChip code={match.homeCode} align="l" />
        <div className="shrink-0 min-w-[44px] text-center">
          {finished ? (
            <span className="text-lg font-extrabold tnum leading-none">
              {match.homeScore}
              <span className="text-muted font-bold mx-0.5">-</span>
              {match.awayScore}
            </span>
          ) : isTbd ? (
            <span className="text-xs text-muted font-medium">-</span>
          ) : (
            <span className="text-xs text-muted font-medium">vs</span>
          )}
        </div>
        <TeamChip code={match.awayCode} align="r" />
      </div>

      {/* 深夜・早朝ヒント */}
      {!finished && hint && (
        <div className="mt-1.5 text-[10px] text-jpred font-medium">{hint}</div>
      )}

      {/* 勝者バッジ */}
      {finished && (
        <div className="mt-2">
          <WinnerTag match={match} />
        </div>
      )}
    </Link>
  );
}

// ─── ページ本体 ───────────────────────────────────────────────────
export default async function BracketPage() {
  const { matches } = await getMatches();
  const byId = new Map(matches.map((m) => [m.id, m]));

  const r32Finished = R32_IDS.filter((id) => byId.get(id)?.status === "FINISHED").length;

  // R32 を日付順にまとめる
  const r32Sorted = R32_IDS
    .map((id) => byId.get(id))
    .filter(Boolean)
    .sort((a, b) => +new Date(a!.utcDate) - +new Date(b!.utcDate)) as Match[];

  const r32ByDate = new Map<string, Match[]>();
  for (const m of r32Sorted) {
    const key = jstDateLabel(m.utcDate);
    if (!r32ByDate.has(key)) r32ByDate.set(key, []);
    r32ByDate.get(key)!.push(m);
  }

  // 日本の状況
  const japanR32 = byId.get("m-r32-4");
  const japanFinished = japanR32?.status === "FINISHED";
  const japanWon = japanFinished && (
    (japanR32?.awayCode === "JPN" && japanR32.awayScore! > japanR32.homeScore!) ||
    (japanR32?.homeCode === "JPN" && japanR32.homeScore! > japanR32.awayScore!)
  );
  const japanLost = japanFinished && !japanWon;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <PageHeader
        eyebrow="試合"
        title="決勝トーナメント"
        description="グループステージを勝ち抜いた32チームによる一発勝負。ラウンド32から決勝までの全組み合わせ。"
      />

      <SectionTabs items={MATCH_TABS} title="試合" />

      {/* 進捗バー */}
      <div className="mb-6 rounded-xl border border-line bg-surface p-3 flex items-center justify-between text-sm">
        <div>
          <span className="font-bold text-jpnavy">ラウンド32：{r32Finished}/16 完了</span>
          <span className="text-xs text-muted ml-2">{16 - r32Finished}試合 残</span>
        </div>
        <div className="flex gap-0.5">
          {R32_IDS.map((id) => {
            const s = byId.get(id)?.status;
            return (
              <div
                key={id}
                className={`w-3 h-3 rounded-sm ${
                  s === "FINISHED" ? "bg-jpnavy" :
                  s === "LIVE" ? "bg-jpred animate-pulse" :
                  "bg-line"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* 🇯🇵 日本の勝ち上がりルート */}
      <section className="mb-10">
        <div className="rounded-2xl border-2 border-jpred overflow-hidden">
          <div className="bg-jpred text-white px-4 py-3 font-bold flex items-center gap-2 text-sm">
            🇯🇵 日本代表 勝ち上がりルート
            <span className="ml-auto text-[11px] font-normal opacity-80">
              ラウンド32 → 決勝
            </span>
          </div>
          <div className="p-4 space-y-0">
            {JAPAN_PATH.map((step, i) => {
              const m = byId.get(step.matchId);
              const isJpnMatch = m?.homeCode === "JPN" || m?.awayCode === "JPN";
              const isFinished = m?.status === "FINISHED";
              const jpnWonHere = isFinished && isJpnMatch && (
                (m?.awayCode === "JPN" && m!.awayScore! > m!.homeScore!) ||
                (m?.homeCode === "JPN" && m!.homeScore! > m!.awayScore!)
              );
              const jpnLostHere = isFinished && isJpnMatch && !jpnWonHere;
              const isUpcoming = !isFinished && m?.status === "SCHEDULED";
              // R32戦なら「本日」かどうかを日付文字列で判定
              const isToday = m ? jstDateLabel(m.utcDate).startsWith("6/29") || jstDateLabel(m.utcDate).startsWith("6/30") : false;

              return (
                <div key={step.matchId}>
                  <div
                    className={`rounded-xl p-3 border ${
                      jpnWonHere
                        ? "bg-emerald-50 border-emerald-200"
                        : jpnLostHere
                        ? "bg-gray-50 border-gray-200 opacity-60"
                        : isJpnMatch && isUpcoming
                        ? "bg-jpred/5 border-jpred"
                        : "bg-surface border-line"
                    }`}
                  >
                    {/* ラウンド名 & バッジ */}
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span className="text-xs font-bold text-jpnavy">{step.round}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isJpnMatch && isUpcoming && isToday && (
                          <span className="text-[10px] font-bold text-white bg-jpred px-1.5 py-0.5 rounded-full">
                            本日！
                          </span>
                        )}
                        {jpnWonHere && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                            ✓ 突破
                          </span>
                        )}
                        {jpnLostHere && (
                          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                            惜敗
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 対戦内容 */}
                    {m ? (
                      <Link href={`/matches/${m.id}`} className="block">
                        <div className="flex items-center gap-2">
                          <TeamChip code={m.homeCode} align="l" />
                          <div className="shrink-0 min-w-[44px] text-center">
                            {m.status === "FINISHED" ? (
                              <span className="text-base font-extrabold tnum">
                                {m.homeScore}
                                <span className="text-muted font-bold mx-0.5">-</span>
                                {m.awayScore}
                              </span>
                            ) : m.homeCode === "TBD" ? (
                              <span className="text-xs text-muted">TBD</span>
                            ) : (
                              <span className="text-xs text-muted">vs</span>
                            )}
                          </div>
                          <TeamChip code={m.awayCode} align="r" />
                        </div>
                        <div className="mt-1.5 text-[10px] text-muted flex items-center gap-1.5">
                          <span>{jstDateLabel(m.utcDate)} {jstTimeLabel(m.utcDate)} JST</span>
                          <span>・</span>
                          <span>{m.city ?? m.venue}</span>
                        </div>
                      </Link>
                    ) : (
                      <p className="text-xs text-muted py-1">
                        前の試合の勝者が進出
                      </p>
                    )}
                  </div>

                  {/* 矢印 */}
                  {i < JAPAN_PATH.length - 1 && !jpnLostHere && (
                    <div className="flex justify-center items-center py-1 gap-1 text-[10px] text-muted">
                      <div className="w-px h-3 bg-jpred/40" />
                      <span className="px-1">勝てば</span>
                      <div className="w-px h-3 bg-jpred/40" />
                    </div>
                  )}
                  {jpnLostHere && (
                    <p className="text-center text-[10px] text-muted py-2">
                      日本はここで敗退
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ラウンド32 全試合 */}
      <section className="mb-10">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2">
          🎯 ラウンド32 全16試合
          <span className="text-xs font-normal text-muted">6/29〜7/3（JST）</span>
        </h2>

        <div className="space-y-6">
          {[...r32ByDate.entries()].map(([dateLabel, dayMatches]) => (
            <div key={dateLabel}>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1 bg-line" />
                <span className="text-[11px] font-bold text-muted whitespace-nowrap">
                  {dateLabel}（日本時間）
                </span>
                <div className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dayMatches.map((m) => (
                  <BracketCard
                    key={m.id}
                    match={m}
                    highlight={m.homeCode === "JPN" || m.awayCode === "JPN"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ラウンド16 */}
      <section className="mb-8">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          ⚔️ ラウンド16
          <span className="text-xs font-normal text-muted">7/4〜7/7（現地）</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {R16_IDS.map((id) => (
            <BracketCard key={id} match={byId.get(id)} highlight={id === "m-r16-2"} />
          ))}
        </div>
        <p className="text-[11px] text-muted mt-2">
          ※ 日本（勝ち上がりの場合）は m-r16-2（ダラス・AT&amp;Tスタジアム）に進出。
        </p>
      </section>

      {/* 準々決勝 */}
      <section className="mb-8">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          🔥 準々決勝
          <span className="text-xs font-normal text-muted">7/9〜7/11（現地）</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QF_IDS.map((id) => (
            <BracketCard key={id} match={byId.get(id)} highlight={id === "m-qf-1"} />
          ))}
        </div>
      </section>

      {/* 準決勝 */}
      <section className="mb-8">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          🏟️ 準決勝
          <span className="text-xs font-normal text-muted">7/14〜7/15（現地）</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SF_IDS.map((id) => (
            <BracketCard key={id} match={byId.get(id)} highlight={id === "m-sf-1"} />
          ))}
        </div>
      </section>

      {/* 3位・決勝 */}
      <section className="mb-10">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          🏆 3位決定戦・決勝
          <span className="text-xs font-normal text-muted">7/18〜7/19（現地）</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BracketCard match={byId.get("m-3rd")} />
          <BracketCard match={byId.get("m-final")} />
        </div>
        <p className="text-[11px] text-muted mt-2">
          決勝は 7/19（現地）/ 日本時間 7/20 04:00 ニューヨーク・ニュージャージー メットライフスタジアム。
        </p>
      </section>

      {/* ブラケット構造の凡例 */}
      <section className="mb-8">
        <div className="rounded-xl border border-line bg-surface/60 p-4 text-xs text-muted">
          <p className="font-bold text-foreground mb-1.5">📐 ブラケット構造について</p>
          <p>16ブロックのR32試合が8つのR16へ → 4つの準々決勝 → 2つの準決勝 → 決勝へと続くトーナメント方式。</p>
          <p className="mt-1">日本の勝ち上がりブロック（R16-2ブロック）：NED/MAR側の勝者とも同ブロックになる可能性があります。</p>
          <p className="mt-1">対戦カードは各ラウンドの試合が終わるごとに確定します。</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link href="/groups" className="text-sm font-bold text-jpnavy hover:underline">
          📊 グループ最終順位 →
        </Link>
        <Link href="/japan" className="text-sm font-medium text-jpnavy hover:underline">
          🇯🇵 日本特集 →
        </Link>
        <Link href="/schedule" className="text-sm font-medium text-jpnavy hover:underline">
          📅 日程一覧 →
        </Link>
      </div>
    </div>
  );
}
