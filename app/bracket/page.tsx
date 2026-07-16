import Link from "next/link";
import { getMatches } from "@/lib/football";
import { getTeam } from "@/data/teams";
import { Match } from "@/lib/types";
import { jstDateLabel, jstTimeLabel, jstWatchHint } from "@/lib/datetime";
import SectionTabs, { MATCH_TABS } from "@/components/layout/SectionTabs";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "決勝トーナメント組み合わせ｜決勝はスペイン×アルゼンチン・日本の軌跡｜100倍Wカップ",
  description:
    "2026ワールドカップ決勝トーナメント。ラウンド32から準決勝までの全結果と、7/19の決勝（スペイン×アルゼンチン）・7/18の3位決定戦（フランス×イングランド）の展望、日本代表のブラジル戦（ラウンド32）までの軌跡を掲載。",
};

// 日本の軌跡（ラウンド32でブラジルに敗退）
const JAPAN_MATCH_ID = "m-r32-4";

// ブラケット構造の参考メモ（実際の結果に基づく地域ブロック別ペアリング）：
// R32 [LA:CAN-RSA / MTY:NED-MAR] → R16-1 [CAN vs MAR]
// R32 [NYNJ:FRA-SWE / BOS:GER-PAR] → R16-2 [FRA vs PAR]
// R32 [HOU:BRA-JPN / DAL:CIV-NOR] → R16-3 [BRA vs NOR] ← 日本敗退ブロック
// R32 [AZT:MEX-ECU / ATL:ENG-COD] → R16-4 [MEX vs ENG]
// R32 [TOR:POR-CRO / LA:ESP-AUT] → R16-5 [POR vs ESP]
// R32 [SF:USA-BIH / SEA:BEL-SEN] → R16-6 [USA vs BEL]
// R32 [MIA:ARG-CPV / DAL:AUS-EGY] → R16-7 [ARG vs EGY]
// R32 [KAN:COL-GHA / VAN:SUI-ALG] → R16-8 [COL vs SUI]
// R16-1+R16-2 → QF-1（FRA 2-0 MAR・7/9）／R16-5+R16-6 → QF-2（ESP 2-1 BEL・7/10）
// R16-3+R16-4 → QF-3（NOR 1-2 ENG・延長・7/11）／R16-7+R16-8 → QF-4（ARG 3-1 SUI・延長・7/11）
// QF-1+QF-2 → SF-1（FRA 0-2 ESP・7/14）／QF-3+QF-4 → SF-2（ENG 1-2 ARG・7/15）
// 決勝（7/19 NYNJ）: ESP vs ARG／3位決定戦（7/18 MIA）: FRA vs ENG

const R32_IDS = [
  "m-r32-3", "m-r32", "m-r32-2", "m-r32-5", "m-r32-4", "m-r32-6",
  "m-r32-7", "m-r32-8", "m-r32-9", "m-r32-10", "m-r32-11", "m-r32-12",
  "m-r32-13", "m-r32-14", "m-r32-15", "m-r32-16",
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

// ─── ヘルパー：PK戦の表記 ──────────────────────────────────────────
function pkLabel(match: Match): string | null {
  if (match.pkHome == null || match.pkAway == null) return null;
  return `PK ${match.pkHome}-${match.pkAway}`;
}

// ─── ヘルパー：勝者の表示（PK戦対応） ──────────────────────────────
function WinnerTag({ match }: { match: Match }) {
  if (match.status !== "FINISHED") return null;
  const h = getTeam(match.homeCode);
  const a = getTeam(match.awayCode);
  const pk = pkLabel(match);

  if (match.homeScore === match.awayScore && pk) {
    const homeWonPk = match.pkHome! > match.pkAway!;
    const winner = homeWonPk ? h : a;
    const code = homeWonPk ? match.homeCode : match.awayCode;
    return (
      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
        {winner?.flag} {winner?.name ?? code} 勝利（{pk}） →
      </span>
    );
  }
  if (match.homeScore! > match.awayScore!) {
    return (
      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
        {h?.flag} {h?.name ?? match.homeCode}
        {match.extraTime ? "（延長）" : ""} 勝利 →
      </span>
    );
  }
  if (match.awayScore! > match.homeScore!) {
    return (
      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
        {a?.flag} {a?.name ?? match.awayCode}
        {match.extraTime ? "（延長）" : ""} 勝利 →
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
  const pk = pkLabel(match);

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

      {/* 延長・PK表記 */}
      {finished && (match.extraTime || pk) && (
        <div className="mt-1 text-center text-[10px] text-muted">
          {match.extraTime && "延長 "}
          {pk && pk}
        </div>
      )}

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
  const r16Finished = R16_IDS.filter((id) => byId.get(id)?.status === "FINISHED").length;
  const qfFinished = QF_IDS.filter((id) => byId.get(id)?.status === "FINISHED").length;
  const sfFinished = SF_IDS.filter((id) => byId.get(id)?.status === "FINISHED").length;

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

  // 日本の結果
  const japanMatch = byId.get(JAPAN_MATCH_ID);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <PageHeader
        eyebrow="試合"
        title="決勝トーナメント"
        description="グループステージを勝ち抜いた32チームによる一発勝負。準決勝までの全結果が確定し、決勝はスペイン×アルゼンチンに決定。"
      />

      <SectionTabs items={MATCH_TABS} title="試合" />

      {/* 進捗バー */}
      <div className="mb-6 rounded-xl border border-line bg-surface p-3 space-y-2 text-sm">
        <div className="flex items-center justify-between flex-wrap gap-y-1">
          <span className="font-bold text-jpnavy">R32：{r32Finished}/16</span>
          <span className="font-bold text-jpnavy">R16：{r16Finished}/8</span>
          <span className="font-bold text-jpnavy">準々決勝：{qfFinished}/4</span>
          <span className="font-bold text-jpred">準決勝：{sfFinished}/2 完了・決勝カード決定</span>
        </div>
      </div>

      {/* 🇯🇵 日本の軌跡 */}
      <section className="mb-10">
        <div className="rounded-2xl border-2 border-jpred overflow-hidden">
          <div className="bg-jpred text-white px-4 py-3 font-bold flex items-center gap-2 text-sm">
            🇯🇵 日本代表 W杯2026の軌跡
            <span className="ml-auto text-[11px] font-normal opacity-80">
              グループF2位 → ラウンド32で敗退
            </span>
          </div>
          <div className="p-4">
            <div className="rounded-xl p-3 border bg-gray-50 border-gray-200">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="text-xs font-bold text-jpnavy">ラウンド32（史上初の決勝T進出）</span>
                <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-full">
                  惜敗
                </span>
              </div>
              {japanMatch ? (
                <Link href={`/matches/${japanMatch.id}`} className="block">
                  <div className="flex items-center gap-2">
                    <TeamChip code={japanMatch.homeCode} align="l" />
                    <div className="shrink-0 min-w-[44px] text-center">
                      <span className="text-base font-extrabold tnum">
                        {japanMatch.homeScore}
                        <span className="text-muted font-bold mx-0.5">-</span>
                        {japanMatch.awayScore}
                      </span>
                    </div>
                    <TeamChip code={japanMatch.awayCode} align="r" />
                  </div>
                  <div className="mt-1.5 text-[10px] text-muted flex items-center gap-1.5">
                    <span>{jstDateLabel(japanMatch.utcDate)} {jstTimeLabel(japanMatch.utcDate)} JST</span>
                    <span>・</span>
                    <span>{japanMatch.city ?? japanMatch.venue}</span>
                  </div>
                </Link>
              ) : (
                <p className="text-xs text-muted py-1">試合情報が見つかりません</p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-foreground/80">
                29分に佐野海舟が先制し前半をリードで折り返す大健闘を見せたが、後半56分にカゼミロに追いつかれ、
                アディショナルタイム90+5分に途中出場のマルティネッリに決勝点を許し2-1で逆転負け。
                森保一監督は「監督としての力不足で申し訳ない」と涙を見せつつ「世界一を目指す気持ちを持ち続ければ必ずそこに辿り着ける」と前を向いた。
                日本を破ったブラジルもラウンド16でノルウェーに敗れ大会を去っている。
              </p>
              <Link href="/japan" className="mt-3 inline-block text-xs font-bold text-jpnavy hover:underline">
                🇯🇵 日本代表の全軌跡を見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ラウンド32 全試合 */}
      <section className="mb-10">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2">
          🎯 ラウンド32 全16試合
          <span className="text-xs font-normal text-muted">6/29〜7/3（JST）・全結果確定</span>
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
          <span className="text-xs font-normal text-muted">7/4〜7/7（現地）・全結果確定</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {R16_IDS.map((id) => (
            <BracketCard key={id} match={byId.get(id)} />
          ))}
        </div>
      </section>

      {/* 準々決勝 */}
      <section className="mb-8">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          🔥 準々決勝
          <span className="text-xs font-normal text-muted">7/9〜7/11（現地）・全結果確定</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QF_IDS.map((id) => (
            <BracketCard key={id} match={byId.get(id)} />
          ))}
        </div>
      </section>

      {/* 準決勝 */}
      <section className="mb-8">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          🏟️ 準決勝
          <span className="text-xs font-normal text-muted">7/14〜7/15（現地）・全結果確定</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SF_IDS.map((id) => (
            <BracketCard key={id} match={byId.get(id)} />
          ))}
        </div>
      </section>

      {/* 3位・決勝 */}
      <section className="mb-10">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          🏆 3位決定戦・決勝
          <span className="text-xs font-normal text-muted">7/18〜7/19（現地）・カード決定</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BracketCard match={byId.get("m-3rd")} />
          <BracketCard match={byId.get("m-final")} highlight />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-foreground/80">
          決勝は39歳メッシ擁するアルゼンチンと18歳ラミン・ヤマルのスペインによる初対決。スペインは無敗記録37試合でイタリアの歴代記録に並び、
          アルゼンチンはメッシがW杯通算得点を歴代最多21点に伸ばして勢いに乗る。前日7/18の3位決定戦は敗れた両準決勝チーム、フランス対イングランド。
        </p>
        <p className="text-[11px] text-muted mt-2">
          決勝は 7/19（現地）/ 日本時間 7/20 04:00 ニューヨーク・ニュージャージー メットライフスタジアム。
        </p>
      </section>

      {/* ブラケット構造の凡例 */}
      <section className="mb-8">
        <div className="rounded-xl border border-line bg-surface/60 p-4 text-xs text-muted">
          <p className="font-bold text-foreground mb-1.5">📐 ブラケット構造について</p>
          <p>16ブロックのR32試合が8つのR16へ → 4つの準々決勝 → 2つの準決勝 → 決勝へと続くトーナメント方式。</p>
          <p className="mt-1">日本はブラジルとのラウンド32で敗退。ブラジルもラウンド16でノルウェーに敗れている。</p>
          <p className="mt-1">残る試合は3位決定戦（7/18）と決勝（7/19）の2試合のみ。</p>
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
