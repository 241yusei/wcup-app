import Link from "next/link";
import Image from "next/image";
import { getMatches } from "@/lib/football";
import { getTeam, teams } from "@/data/teams";
import { jstDateLabel, jstTimeLabel, jstWatchHint } from "@/lib/datetime";
import { Match } from "@/lib/types";
import ReminderButton from "@/components/schedule/ReminderButton";
import MyFavorites, { type FavMatch } from "@/components/MyFavorites";
import HomeQuizBadge from "@/components/HomeQuizBadge";
import NextMatchCountdown from "@/components/NextMatchCountdown";
import { japanBroadcast } from "@/data/broadcast";
import LiveBadge from "@/components/LiveBadge";

const teamMap: Record<string, { name: string; flag: string }> = Object.fromEntries(
  teams.map((t) => [t.code, { name: t.name, flag: t.flag }])
);

// ホームに置く主要導線（厳選）。残りは「もっと」メニュー／各ハブのタブから。
const quickLinks = [
  { href: "/schedule", icon: "📅", title: "試合日程", desc: "全104試合を日本時間で" },
  { href: "/groups", icon: "📊", title: "順位表", desc: "全12組の勝点状況" },
  { href: "/japan", icon: "🇯🇵", title: "日本特集", desc: "突破条件・対戦国攻略" },
  { href: "/teams", icon: "🌍", title: "各国図鑑", desc: "48カ国・注目選手" },
  { href: "/stats", icon: "👟", title: "得点ランキング", desc: "ゴールデンブーツ" },
  { href: "/watch", icon: "📺", title: "どこで見る？", desc: "放送・配信ガイド" },
];

// 試合カード1行（直近の試合タイムライン用）。
function MatchRow({ m }: { m: Match }) {
  const home = getTeam(m.homeCode);
  const away = getTeam(m.awayCode);
  const finished = m.status === "FINISHED";
  const jp = m.homeCode === "JPN" || m.awayCode === "JPN";
  const hint = jstWatchHint(m.utcDate);
  return (
    <Link
      href={`/matches/${m.id}`}
      className={`flex items-center gap-3 rounded-2xl border bg-surface p-3.5 hover:border-jpnavy/40 transition-colors ${
        jp ? "border-jpred/50 ring-1 ring-jpred/10" : "border-line"
      }`}
    >
      <div className="shrink-0 w-20 text-center">
        {finished ? (
          <span className="text-[10px] font-bold text-muted bg-line/60 rounded-full px-2 py-0.5">
            終了
          </span>
        ) : (
          <>
            <div className="text-[11px] text-muted leading-tight">
              {jstDateLabel(m.utcDate)}
            </div>
            <div className="font-mono font-bold text-sm leading-tight">
              {jstTimeLabel(m.utcDate)}
            </div>
            <div className="mt-0.5">
              <LiveBadge utcDate={m.utcDate} status={m.status} />
            </div>
          </>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">{home?.flag ?? "🏳️"}</span>
          <span className="font-bold text-sm truncate">{home?.name ?? m.homeCode}</span>
          {finished && (
            <span className="ml-auto font-mono font-extrabold">{m.homeScore}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-lg">{away?.flag ?? "🏳️"}</span>
          <span className="font-bold text-sm truncate">{away?.name ?? m.awayCode}</span>
          {finished && (
            <span className="ml-auto font-mono font-extrabold">{m.awayScore}</span>
          )}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-[10px] text-muted">{m.stage}</div>
        {hint ? (
          <div className="text-[10px] text-jpred font-medium">{hint}</div>
        ) : (
          m.city && <div className="text-[10px] text-muted truncate max-w-24">📍{m.city}</div>
        )}
      </div>
    </Link>
  );
}

export default async function Home() {
  const { matches } = await getMatches();
  const sorted = [...matches].sort(
    (a, b) => +new Date(a.utcDate) - +new Date(b.utcDate)
  );

  const japanMatches = sorted.filter(
    (m) => m.homeCode === "JPN" || m.awayCode === "JPN"
  );
  const nextJapan = japanMatches.find((m) => m.status !== "FINISHED");
  const nextJapanOpp = nextJapan
    ? getTeam(nextJapan.homeCode === "JPN" ? nextJapan.awayCode : nextJapan.homeCode)
    : undefined;
  const nextJapanTv = nextJapanOpp
    ? japanBroadcast.find((b) => b.opp === nextJapanOpp.name)
    : undefined;

  // 直近の試合：最新の終了結果1件＋これからの試合5件。
  const upcoming = sorted.filter((m) => m.status !== "FINISHED").slice(0, 5);
  const lastFinished = [...sorted].reverse().find((m) => m.status === "FINISHED");
  const pickup = [lastFinished, ...upcoming].filter(Boolean) as Match[];

  // 推しフィード用の軽量データ（クライアントコンポーネントへ渡す）。
  const favMatches: FavMatch[] = sorted.map((m) => ({
    id: m.id,
    homeCode: m.homeCode,
    awayCode: m.awayCode,
    utcDate: m.utcDate,
    status: m.status,
    stage: m.stage,
    city: m.city,
  }));

  return (
    <div>
      {/* ヒーロー */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="colors-stripe-thin w-24 rounded-full mb-4" />
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              <span className="text-jpred">100倍</span>、
              <br />
              ワールドカップを
              <br />
              <span className="text-jpnavy">楽しもう。</span>
            </h1>
            <p className="text-muted text-base mb-6 leading-relaxed">
              サッカーをよく知らなくても大丈夫。
              日程・順位・各国の見どころ・視聴ガイドまで、ぜんぶここで。
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/japan"
                className="px-5 py-2.5 rounded-full bg-jpnavy text-white font-medium hover:opacity-90 transition-opacity"
              >
                🇯🇵 日本代表を100倍楽しむ
              </Link>
              <Link
                href="/schedule"
                className="px-5 py-2.5 rounded-full border border-jpnavy text-jpnavy font-medium hover:bg-jpnavy hover:text-white transition-colors"
              >
                試合日程を見る
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/mascot-v2.png"
              alt="ワールドカップ人間くん"
              width={400}
              height={400}
              className="h-56 w-auto drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      <HomeQuizBadge />

      {/* 次の日本戦カウントダウン */}
      {nextJapan && (
        <section className="max-w-6xl mx-auto px-4 pt-6">
          <Link
            href={`/matches/${nextJapan.id}`}
            className="block rounded-2xl bg-jpred text-white p-5 hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="text-[11px] text-white/70 tracking-widest mb-1">
                  🇯🇵 次の日本戦
                </div>
                <p className="font-bold text-lg leading-snug">
                  日本 vs {nextJapanOpp?.name ?? "—"} {nextJapanOpp?.flag}
                </p>
                <p className="text-xs text-white/80 mt-1">
                  {jstDateLabel(nextJapan.utcDate)} {jstTimeLabel(nextJapan.utcDate)} JST
                  {nextJapan.city && `・${nextJapan.city}`}
                </p>
                {nextJapanTv && (
                  <p className="text-xs text-white/90 mt-1.5 font-medium">
                    📺 {nextJapanTv.tv}（{nextJapanTv.free}）
                  </p>
                )}
              </div>
              <div className="shrink-0">
                <NextMatchCountdown
                  targetUtc={nextJapan.utcDate}
                  label="キックオフまで"
                />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 直近・注目の試合 */}
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="flex items-end justify-between gap-3 mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            ⚡ 直近の試合
          </h2>
          <Link href="/schedule" className="text-sm font-bold text-jpnavy hover:underline">
            全日程 →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {pickup.map((m) => (
            <MatchRow key={m.id} m={m} />
          ))}
        </div>
      </section>

      {/* マイ推し */}
      <MyFavorites teamMap={teamMap} matches={favMatches} />

      {/* 日本代表の全試合 */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-5">
          <Image
            src="/mascot-ball.png"
            alt=""
            width={52}
            height={126}
            className="shrink-0 drop-shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">🇯🇵 日本代表の試合</h2>
            <span className="text-sm text-muted">
              グループF・全試合を日本時間で。🔔でカレンダー登録。
            </span>
          </div>
        </div>
        {japanMatches.length === 0 ? (
          <p className="text-sm text-muted">日程は確定後に表示されます。</p>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4">
            {japanMatches.map((m) => {
              const oppCode = m.homeCode === "JPN" ? m.awayCode : m.homeCode;
              const opp = getTeam(oppCode);
              const hint = jstWatchHint(m.utcDate);
              return (
                <div
                  key={m.id}
                  className="bg-surface rounded-2xl border border-jpred/40 ring-1 ring-jpred/10 p-4 flex flex-col"
                >
                  <div className="text-xs font-medium text-muted">{m.stage}</div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
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
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-bold text-lg">{jstDateLabel(m.utcDate)}</span>
                    <span className="font-mono font-bold text-lg">
                      {jstTimeLabel(m.utcDate)}
                    </span>
                    <span className="text-xs text-muted">JST</span>
                  </div>
                  {hint && (
                    <div className="text-xs text-jpred font-medium mt-1">{hint}</div>
                  )}
                  {(m.city || m.stadium) && (
                    <div className="mt-2 flex items-start gap-1.5 text-xs text-muted">
                      <span aria-hidden>📍</span>
                      <span>
                        {m.city}
                        {m.stadium && (
                          <span className="text-foreground/70">・{m.stadium}</span>
                        )}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 pt-3 border-t border-line flex flex-col gap-2">
                    <Link
                      href={`/matches/${m.id}`}
                      className="text-xs font-bold text-jpnavy hover:underline"
                    >
                      📋 この試合の見どころ →
                    </Link>
                    <ReminderButton
                      uid={m.id}
                      title={`⚽ 日本 vs ${opp?.name ?? oppCode}`}
                      utcStart={m.utcDate}
                      location={m.stadium ?? m.city ?? m.venue}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 因縁バナー */}
      <section className="max-w-6xl mx-auto px-4">
        <Link
          href="/story"
          className="block rounded-2xl bg-jpnavy text-white p-5 relative overflow-hidden hover:opacity-95 transition-opacity"
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 15% 30%, white, transparent), radial-gradient(1.5px 1.5px at 70% 20%, white, transparent), radial-gradient(1px 1px at 45% 75%, white, transparent), radial-gradient(1px 1px at 90% 55%, white, transparent)",
            }}
            aria-hidden
          />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-white/60 tracking-widest mb-1">🌙 因縁</div>
              <p className="font-bold leading-snug">
                試合は、物語として読むと100倍になる。
              </p>
              <p className="text-xs text-white/70 mt-1">因縁・登場人物・伏線</p>
            </div>
            <span className="shrink-0 text-sm font-bold bg-white text-jpnavy rounded-full px-4 py-2">
              読む →
            </span>
          </div>
        </Link>
      </section>

      {/* クイックリンク（厳選） */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🧭 メニュー</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group bg-surface border border-line rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-jpnavy/50 hover:shadow-sm active:scale-[0.98]"
            >
              <div className="text-2xl mb-1.5">{f.icon}</div>
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-xs text-muted leading-relaxed mt-0.5">{f.desc}</p>
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted mt-4">
          ほかの機能（予想・ニュース・アルバム・学ぶ・トリオン解説）は、右上／下の
          <strong className="text-jpnavy">「もっと」</strong>から。
        </p>
      </section>
    </div>
  );
}
