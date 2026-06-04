import Link from "next/link";
import Image from "next/image";
import { getMatches } from "@/lib/football";
import { fallbackMatches } from "@/data/matches";
import { getTeam } from "@/data/teams";
import {
  japanInfo,
  opponentGuides,
  japanStats,
  japanStatsCaveats,
} from "@/data/japanHub";
import { jstDateLabel, jstTimeLabel, jstWatchHint } from "@/lib/datetime";
import ReminderButton from "@/components/schedule/ReminderButton";
import NextMatchCountdown from "@/components/NextMatchCountdown";

export const revalidate = 60;

export const metadata = {
  title: "日本代表を100倍楽しむ｜グループF 完全ガイド｜100倍Wカップ",
  description:
    "2026ワールドカップ・日本代表（サムライブルー）を100倍楽しむ特集。グループFの突破条件、3試合の日程（日本時間）、対戦国オランダ・チュニジア・スウェーデンの攻略ガイドと警戒選手まで。",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
      <span className="colors-stripe-thin w-6 rounded-full inline-block" />
      {children}
    </h2>
  );
}

export default async function JapanPage() {
  const { matches } = await getMatches();
  const source = matches.some((m) => m.homeCode === "JPN" || m.awayCode === "JPN")
    ? matches
    : fallbackMatches;
  const japanMatches = source
    .filter((m) => m.homeCode === "JPN" || m.awayCode === "JPN")
    .sort((a, b) => +new Date(a.utcDate) - +new Date(b.utcDate));
  const jpn = getTeam("JPN");

  const nowMs = Date.now();
  const nextMatch =
    japanMatches.find((m) => new Date(m.utcDate).getTime() > nowMs) ??
    japanMatches[0];
  const nextOpp = nextMatch
    ? getTeam(nextMatch.homeCode === "JPN" ? nextMatch.awayCode : nextMatch.homeCode)
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ヒーロー */}
      <header className="mb-8 rounded-2xl overflow-hidden border border-line">
        <div className="colors-stripe-thin w-full" />
        <div className="bg-jpnavy text-white p-6">
          <div className="flex items-center gap-4">
            <span className="text-6xl" aria-hidden>
              🇯🇵
            </span>
            <div>
              <h1 className="text-3xl font-bold mb-1">日本代表を100倍楽しむ</h1>
              <p className="text-white/80 text-sm leading-relaxed">
                サムライブルーの2026年。グループFの突破条件・対戦国の攻略法・
                注目選手まで、日本戦の楽しみ方をぜんぶここで。
              </p>
            </div>
          </div>
          {nextMatch && nextOpp && (
            <div className="mt-4">
              <NextMatchCountdown
                targetUtc={nextMatch.utcDate}
                label={`⏱ 次の日本戦：日本 vs ${nextOpp.name} まで`}
              />
            </div>
          )}
        </div>
      </header>

      {/* 日本の3試合 */}
      <section className="mb-12">
        <SectionTitle>🗓 日本代表の全3試合（日本時間）</SectionTitle>
        {japanMatches.length === 0 ? (
          <p className="text-sm text-muted">日程は確定後に表示されます。</p>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4">
            {japanMatches.map((m, i) => {
              const oppCode = m.homeCode === "JPN" ? m.awayCode : m.homeCode;
              const opp = getTeam(oppCode);
              const hint = jstWatchHint(m.utcDate);
              return (
                <div
                  key={m.id}
                  className="bg-surface rounded-2xl border border-jpred/40 ring-1 ring-jpred/10 p-4 flex flex-col"
                >
                  <div className="text-xs font-bold text-jpred">
                    第{i + 1}戦
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-2xl" aria-hidden>
                      🇯🇵
                    </span>
                    <span className="font-bold">日本</span>
                    <span className="text-xs text-muted">vs</span>
                    <Link
                      href={opp ? `/teams/${oppCode}` : "#"}
                      className="flex items-center gap-1.5 hover:underline"
                    >
                      <span className="text-2xl" aria-hidden>
                        {opp?.flag ?? "🏳️"}
                      </span>
                      <span className="font-bold">{opp?.name ?? oppCode}</span>
                    </Link>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-bold">{jstDateLabel(m.utcDate)}</span>
                    <span className="font-mono font-bold">
                      {jstTimeLabel(m.utcDate)}
                    </span>
                    <span className="text-[10px] text-muted">JST</span>
                  </div>
                  {hint && (
                    <div className="text-xs text-jpred font-medium mt-1">
                      {hint}
                    </div>
                  )}
                  {(m.city || m.stadium) && (
                    <div className="mt-1.5 flex items-start gap-1 text-[11px] text-muted">
                      <span aria-hidden>📍</span>
                      <span>
                        {m.city}
                        {m.stadium && `・${m.stadium}`}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 pt-3 border-t border-line flex flex-col gap-2">
                    <ReminderButton
                      uid={m.id}
                      title={`⚽ 日本 vs ${opp?.name ?? oppCode}`}
                      utcStart={m.utcDate}
                      location={m.stadium ?? m.city ?? m.venue}
                    />
                    <Link
                      href={`/matches/${m.id}`}
                      className="text-xs font-bold text-jpnavy hover:underline"
                    >
                      📋 この試合の見どころ →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 突破条件 */}
      <section className="mb-12">
        <SectionTitle>🎯 グループF 突破の条件</SectionTitle>
        <div className="rounded-2xl border border-line bg-surface p-5 space-y-3">
          <p className="text-sm leading-relaxed">{japanInfo.format}</p>
          <div className="rounded-xl bg-jpnavy/5 border border-jpnavy/10 p-3">
            <div className="text-xs font-bold text-jpnavy mb-1">
              現実的なシナリオ
            </div>
            <p className="text-sm leading-relaxed">{japanInfo.scenario}</p>
          </div>
          {japanInfo.knockoutOutlook && (
            <div className="rounded-xl border border-line p-3">
              <div className="text-xs font-bold text-jpnavy mb-1">
                🏆 突破後のトーナメント展望
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {japanInfo.knockoutOutlook}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 日本代表の現在地 */}
      <section className="mb-12">
        <SectionTitle>🔵 日本代表の現在地</SectionTitle>
        <div className="rounded-2xl border border-line bg-surface p-5 mb-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-3">
            {japanInfo.fifaRank && (
              <span>
                <span className="text-muted">FIFAランク</span>{" "}
                <strong className="text-jpnavy text-base">
                  {japanInfo.fifaRank}位
                </strong>
              </span>
            )}
            <span className="text-muted text-xs self-end">
              ※ {japanInfo.asOf}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-2">
            <span className="font-bold">直近の調子：</span>
            {japanInfo.form}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-bold text-foreground">強み：</span>
            {japanInfo.strength}
          </p>
        </div>

        {/* 注目選手 */}
        {jpn && (
          <div className="mb-4">
            <h3 className="font-bold mb-2 text-sm">⭐ 注目選手</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {jpn.players.map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-line bg-surface p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-line/70 shrink-0">
                      {p.position}
                    </span>
                    <span className="font-bold">{p.name}</span>
                    <span className="text-xs text-muted">{p.club}</span>
                  </div>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {p.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 観戦ポイント */}
        {japanInfo.watchTips.length > 0 && (
          <div>
            <h3 className="font-bold mb-2 text-sm">👀 にわか向け・観戦のツボ</h3>
            <div className="space-y-2">
              {japanInfo.watchTips.map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-line bg-surface p-3 flex gap-2 text-sm leading-relaxed"
                >
                  <span className="font-bold text-jpnavy shrink-0">
                    {i + 1}
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 日本代表スタッツ（二重ファクトチェック済み） */}
      {japanStats.length > 0 && (
        <section className="mb-12">
          <SectionTitle>📈 日本代表データ（スタッツ）</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {japanStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-line bg-surface p-4"
              >
                <div className="text-[11px] text-muted leading-tight">
                  {s.label}
                </div>
                <div className="text-lg font-extrabold text-jpnavy leading-tight mt-1">
                  {s.value}
                </div>
                {s.sub && (
                  <div className="text-[11px] text-muted mt-1 leading-snug">
                    {s.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted mt-2 leading-relaxed">
            ※ 数値は独立した2回のファクトチェックで一致した値のみ掲載（FIFA・各種公式記録を参照）。
            {japanStatsCaveats.length > 0 &&
              " " + japanStatsCaveats.join(" ／ ")}
          </p>
        </section>
      )}

      {/* 対戦国 攻略ガイド */}
      <section className="mb-10">
        <SectionTitle>⚔️ 対戦国 攻略ガイド</SectionTitle>
        {opponentGuides.length === 0 ? (
          <p className="text-sm text-muted">攻略ガイドを準備中です。</p>
        ) : (
          <div className="space-y-4">
            {opponentGuides.map((g) => {
              const t = getTeam(g.code);
              return (
                <div
                  key={g.code}
                  className="rounded-2xl border border-line bg-surface overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 border-b border-line">
                    <span className="text-3xl" aria-hidden>
                      {t?.flag ?? "🏳️"}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold">{t?.name ?? g.code}</div>
                      <div className="text-xs text-muted">{g.matchup}</div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-jpnavy text-white shrink-0">
                      {g.style}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted leading-relaxed">
                      {g.styleDesc}
                    </p>
                    <div>
                      <div className="text-xs font-bold mb-1.5">
                        ⚠️ 要警戒選手
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {g.dangerMen.map((d) => (
                          <div
                            key={d.name}
                            className="rounded-xl border border-jpred/30 bg-jpred/5 p-2.5"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-line/70">
                                {d.pos}
                              </span>
                              <span className="font-bold text-sm">{d.name}</span>
                            </div>
                            <div className="text-[11px] text-muted">{d.club}</div>
                            <p className="text-xs mt-1 leading-relaxed">{d.why}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-1.5">
                        🎯 日本の狙い目
                      </div>
                      <ul className="space-y-1">
                        {g.weakness.map((w, i) => (
                          <li
                            key={i}
                            className="text-sm leading-relaxed flex gap-2"
                          >
                            <span className="text-jpnavy">›</span>
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/teams/${g.code}`}
                      className="inline-block text-xs font-bold text-jpnavy hover:underline"
                    >
                      {t?.name ?? g.code}の図鑑を見る →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 導線 */}
      <div className="flex flex-wrap gap-4">
        <Link href="/squad" className="text-sm font-bold text-jpnavy hover:underline">
          📋 代表メンバー全26名の名簿 →
        </Link>
        <Link href="/schedule" className="text-sm font-medium text-jpnavy hover:underline">
          🗓 W杯全試合の日程 →
        </Link>
        <Link href="/teams/JPN" className="text-sm font-medium text-jpnavy hover:underline">
          🇯🇵 日本代表の図鑑 →
        </Link>
      </div>
    </div>
  );
}
