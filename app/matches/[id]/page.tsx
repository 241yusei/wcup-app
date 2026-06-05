import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatches } from "@/lib/football";
import { fallbackMatches } from "@/data/matches";
import { getTeam } from "@/data/teams";
import type { Match } from "@/lib/types";

// ライブAPI（数値ID）とフォールバック（m-open等）のどちらのIDでも解決できるようにする。
async function findMatch(id: string): Promise<Match | undefined> {
  const { matches } = await getMatches();
  return matches.find((x) => x.id === id) ?? fallbackMatches.find((x) => x.id === id);
}
import { getPreview, countryTrivia } from "@/data/matchPreviews";
import { jstDateLabel, jstTimeLabel, jstWatchHint } from "@/lib/datetime";
import ReminderButton from "@/components/schedule/ReminderButton";
import ShareButton from "@/components/ShareButton";
import MatchIntroPopup from "@/components/MatchIntroPopup";
import StoryShare from "@/components/StoryShare";
import { Team } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await findMatch(id);
  if (!m) return { title: "試合解説｜100倍Wカップ" };
  const h = getTeam(m.homeCode)?.name ?? m.homeCode;
  const a = getTeam(m.awayCode)?.name ?? m.awayCode;
  return {
    title: `${h} vs ${a} 試合の見どころ｜100倍Wカップ`,
    description: `${h}対${a}の見どころ・通算対戦成績・直近の調子・注目選手・トリビアをまとめた観戦ガイド。`,
  };
}

function PlayerList({ team }: { team: Team }) {
  return (
    <div className="space-y-2">
      {team.players.map((p) => (
        <div key={p.name} className="rounded-xl border border-line bg-surface p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-line/70 shrink-0">
              {p.position}
            </span>
            <span className="font-bold">{p.name}</span>
            <span className="text-xs text-muted">{p.club}</span>
          </div>
          <p className="text-xs text-muted mt-1 leading-relaxed">{p.why}</p>
        </div>
      ))}
    </div>
  );
}

function TriviaList({ team }: { team: Team }) {
  const researched = countryTrivia[team.code] ?? [];
  return (
    <div className="space-y-2">
      {researched.map((t, i) => (
        <div
          key={`r${i}`}
          className="rounded-xl border border-line bg-surface p-3 flex gap-2"
        >
          <span aria-hidden>💡</span>
          <div>
            <p className="text-sm leading-relaxed">{t.text}</p>
            {t.source && (
              <a
                href={t.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-jpnavy hover:underline"
              >
                出典
              </a>
            )}
          </div>
        </div>
      ))}
      {researched.length === 0 &&
        team.trivia.slice(0, 2).map((t, i) => (
          <div
            key={`t${i}`}
            className="rounded-xl border border-line bg-surface p-3 flex gap-2"
          >
            <span aria-hidden>💡</span>
            <p className="text-sm leading-relaxed">{t}</p>
          </div>
        ))}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
      <span className="colors-stripe-thin w-6 rounded-full inline-block" />
      {children}
    </h2>
  );
}

export default async function MatchDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = await findMatch(id);
  if (!match) notFound();

  const home = getTeam(match.homeCode);
  const away = getTeam(match.awayCode);
  const preview = getPreview(match.homeCode, match.awayCode);
  const finished = match.status === "FINISHED";
  const jpInvolved = match.homeCode === "JPN" || match.awayCode === "JPN";
  const hint = jstWatchHint(match.utcDate);

  // preview の formA/formB は teamA/teamB 基準。表示用に home/away へ対応づける。
  let homeForm: string | undefined;
  let awayForm: string | undefined;
  if (preview) {
    if (preview.teamA === match.homeCode) {
      homeForm = preview.formA;
      awayForm = preview.formB;
    } else {
      homeForm = preview.formB;
      awayForm = preview.formA;
    }
  }
  homeForm = homeForm ?? home?.recent;
  awayForm = awayForm ?? away?.recent;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/schedule" className="text-sm text-muted hover:text-jpnavy">
        ← 試合日程にもどる
      </Link>

      {/* ヘッダー：対戦カード */}
      <header className="mt-4 mb-8 rounded-2xl overflow-hidden border border-line">
        <div className="colors-stripe-thin w-full" />
        <div className="bg-surface p-6">
          <div className="text-xs text-muted font-medium mb-3 text-center">
            {match.stage}
            {match.group ? `・組${match.group}` : ""}
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={home ? `/teams/${match.homeCode}` : "#"}
              className="flex flex-col items-center gap-1 flex-1 hover:opacity-80"
            >
              <span className="text-5xl">{home?.flag ?? "🏳️"}</span>
              <span className="font-bold text-center leading-tight">
                {home?.name ?? match.homeCode}
              </span>
            </Link>
            <div className="text-center shrink-0">
              {finished ? (
                <div className="text-2xl font-extrabold">
                  {match.homeScore} - {match.awayScore}
                </div>
              ) : (
                <div className="text-sm text-muted font-bold">vs</div>
              )}
            </div>
            <Link
              href={away ? `/teams/${match.awayCode}` : "#"}
              className="flex flex-col items-center gap-1 flex-1 hover:opacity-80"
            >
              <span className="text-5xl">{away?.flag ?? "🏳️"}</span>
              <span className="font-bold text-center leading-tight">
                {away?.name ?? match.awayCode}
              </span>
            </Link>
          </div>

          <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
            <span className="font-bold">
              {jstDateLabel(match.utcDate)}{" "}
              <span className="font-mono">{jstTimeLabel(match.utcDate)}</span>{" "}
              <span className="text-xs text-muted">JST</span>
            </span>
            {hint && <span className="text-jpred font-medium text-xs">{hint}</span>}
            {(match.city || match.stadium) && (
              <span className="text-muted text-xs">
                📍 {match.city}
                {match.stadium && `・${match.stadium}`}
              </span>
            )}
          </div>
          <div className="mt-4 flex justify-center flex-wrap gap-2">
            <MatchIntroPopup
              id={match.id}
              title={`${home?.name ?? match.homeCode} vs ${away?.name ?? match.awayCode}`}
              mustKnow={preview?.mustKnow ?? null}
              fallbackPoint={
                preview?.highlights?.[0] ??
                home?.whyWatch ??
                away?.whyWatch ??
                "両国の見どころと注目選手をチェックして、どっちが勝つか予想してみよう。"
              }
            />
            {!finished && (
              <ReminderButton
                uid={match.id}
                title={`⚽ ${home?.name ?? match.homeCode} vs ${away?.name ?? match.awayCode}`}
                utcStart={match.utcDate}
                location={match.stadium ?? match.city ?? match.venue}
              />
            )}
            <ShareButton
              label="この試合をシェア"
              text={`⚽ ${home?.name ?? match.homeCode} vs ${away?.name ?? match.awayCode}（${jstDateLabel(match.utcDate)} ${jstTimeLabel(match.utcDate)} JST）｜100倍Wカップで見どころチェック ${jpInvolved ? "#日本代表 " : ""}#FIFAワールドカップ`}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 text-white hover:bg-white hover:text-jpnavy transition-colors"
            />
            <StoryShare
              data={{
                id: match.id,
                stage: match.stage + (match.group ? `・組${match.group}` : ""),
                homeName: home?.name ?? match.homeCode,
                awayName: away?.name ?? match.awayCode,
                homeEn: home?.enName ?? match.homeCode,
                awayEn: away?.enName ?? match.awayCode,
                homeCode: match.homeCode,
                awayCode: match.awayCode,
                homeFlag: home?.flag ?? "🏳️",
                awayFlag: away?.flag ?? "🏳️",
                date: jstDateLabel(match.utcDate),
                time: jstTimeLabel(match.utcDate),
                jp: jpInvolved,
              }}
            />
          </div>
          {/* SNS実況用ハッシュタグ */}
          <div className="mt-3 text-center text-[11px] text-white/70">
            🗣 SNS実況のおすすめタグ：
            <span className="font-bold text-white">
              {jpInvolved ? "#日本代表 #FIFAワールドカップ" : "#FIFAワールドカップ"}
            </span>
          </div>
        </div>
      </header>

      {/* 観戦のキーポイント（全試合を観た上での見方）— 最重要セクションとして最初に強調 */}
      {preview?.watchPoints?.length ? (
        <section id="points" className="mb-10 scroll-mt-20">
          <div className="rounded-2xl border-2 border-jpnavy bg-jpnavy/[0.04] overflow-hidden shadow-sm">
            <div className="bg-jpnavy text-white px-4 sm:px-5 py-3 flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                🔍
              </span>
              <h2 className="text-lg font-bold">観戦のキーポイント</h2>
              <span className="ml-auto text-[10px] font-medium bg-white/15 rounded-full px-2 py-0.5">
                全試合チェック済み
              </span>
            </div>
            <div className="p-4 sm:p-5 space-y-2.5">
              {preview.watchPoints.map((w, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl bg-surface border border-line p-3"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-jpnavy text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed font-medium">{w}</span>
                </div>
              ))}
              {preview.prediction && (
                <div className="rounded-xl bg-jpred/5 border border-jpred/30 p-3.5 flex gap-2.5">
                  <span className="text-xl" aria-hidden>
                    🔮
                  </span>
                  <div>
                    <div className="text-xs font-bold text-jpred mb-0.5">
                      スコア予想・展望
                    </div>
                    <p className="text-sm leading-relaxed font-medium">
                      {preview.prediction}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-[11px] text-muted mt-2">
            ※ 対戦相手の試合を観た上での観戦ポイント・予想です（戦術的な一つの見方）。
          </p>
        </section>
      ) : null}

      {/* 見どころ */}
      <section className="mb-10">
        <SectionTitle>🔥 この試合の見どころ</SectionTitle>
        {preview?.highlights?.length ? (
          <div className="space-y-3">
            {preview.highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-xl border border-line bg-surface p-4 flex gap-3"
              >
                <span className="font-bold text-jpnavy shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed">{h}</p>
              </div>
            ))}
            {preview.keyMatchup && (
              <div className="rounded-xl border border-jpnavy/20 bg-jpnavy text-white p-4 flex gap-3">
                <span aria-hidden>⚔️</span>
                <div>
                  <div className="text-xs font-bold mb-1 text-white/80">
                    注目のマッチアップ
                  </div>
                  <p className="text-sm leading-relaxed">{preview.keyMatchup}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
            {home?.whyWatch && <p className="mb-2">🔵 {home.whyWatch}</p>}
            {away?.whyWatch && <p>🔴 {away.whyWatch}</p>}
            {!home?.whyWatch && !away?.whyWatch && (
              <p>両国の戦術・注目選手は下のセクションでチェック。</p>
            )}
          </div>
        )}
      </section>

      {/* 通算対戦成績 */}
      {preview?.h2h && (
        <section className="mb-10">
          <SectionTitle>📊 通算対戦成績（ヘッドトゥヘッド）</SectionTitle>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-sm leading-relaxed">{preview.h2h}</p>
          </div>
        </section>
      )}

      {/* 直近の調子 */}
      <section className="mb-10">
        <SectionTitle>📈 両国の直近の状態</SectionTitle>
        {preview?.asOf && (
          <p className="text-[11px] text-muted mb-2">※ {preview.asOf}</p>
        )}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="font-bold mb-1 flex items-center gap-2">
              <span>{home?.flag}</span>
              {home?.name ?? match.homeCode}
            </div>
            <p className="text-sm text-muted leading-relaxed">{homeForm}</p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="font-bold mb-1 flex items-center gap-2">
              <span>{away?.flag}</span>
              {away?.name ?? match.awayCode}
            </div>
            <p className="text-sm text-muted leading-relaxed">{awayForm}</p>
          </div>
        </div>
      </section>

      {/* 召集メンバー・注目選手 */}
      <section className="mb-10">
        <SectionTitle>⭐ 注目選手（両国）</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">
              <span>{home?.flag}</span>
              {home?.name ?? match.homeCode}
            </div>
            {home ? (
              <PlayerList team={home} />
            ) : (
              <p className="text-sm text-muted">データ準備中</p>
            )}
          </div>
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">
              <span>{away?.flag}</span>
              {away?.name ?? match.awayCode}
            </div>
            {away ? (
              <PlayerList team={away} />
            ) : (
              <p className="text-sm text-muted">データ準備中</p>
            )}
          </div>
        </div>
      </section>

      {/* トリビア */}
      <section className="mb-10">
        <SectionTitle>💡 知っておくと面白いトリビア</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">
              <span>{home?.flag}</span>
              {home?.name ?? match.homeCode}
            </div>
            {home && <TriviaList team={home} />}
          </div>
          <div>
            <div className="font-bold mb-2 flex items-center gap-2">
              <span>{away?.flag}</span>
              {away?.name ?? match.awayCode}
            </div>
            {away && <TriviaList team={away} />}
          </div>
        </div>
      </section>

      {/* 出典 */}
      {preview?.sources?.length ? (
        <section className="mb-6">
          <p className="text-[11px] text-muted">
            出典：
            {preview.sources.map((s, i) => (
              <a
                key={i}
                href={s}
                target="_blank"
                rel="noopener noreferrer"
                className="text-jpnavy hover:underline mr-2"
              >
                [{i + 1}]
              </a>
            ))}
          </p>
        </section>
      ) : null}

      <div className="flex gap-4">
        <Link href="/schedule" className="text-sm font-medium text-jpnavy hover:underline">
          ← 全試合の日程
        </Link>
        <Link href="/teams" className="text-sm font-medium text-jpnavy hover:underline">
          各国図鑑 →
        </Link>
      </div>
    </div>
  );
}
