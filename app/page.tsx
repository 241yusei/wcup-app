import Link from "next/link";
import Image from "next/image";
import { getMatches } from "@/lib/football";
import { getTeam, teams } from "@/data/teams";
import { jstDateLabel, jstTimeLabel, jstWatchHint } from "@/lib/datetime";
import ReminderButton from "@/components/schedule/ReminderButton";
import MyFavorites from "@/components/MyFavorites";
import HomeQuizBadge from "@/components/HomeQuizBadge";
import TrionHero from "@/components/TrionHero";
import { judgeWake } from "@/lib/wakeup";

const teamMap: Record<string, { name: string; flag: string }> = Object.fromEntries(
  teams.map((t) => [t.code, { name: t.name, flag: t.flag }])
);


const features = [
  {
    href: "/story",
    icon: "🌙",
    title: "因縁",
    desc: "試合を「物語」として読む。因縁・登場人物・伏線——語り部はトリオン。",
  },
  {
    href: "/album",
    icon: "📔",
    title: "マイW杯アルバム",
    desc: "観た試合のスタンプ・予想成績・メモが「自分だけの大会記録」に育つ。",
  },
  {
    href: "/japan",
    icon: "🇯🇵",
    title: "日本特集",
    desc: "グループF突破条件・対戦国の攻略・観戦ポイント・次戦カウントダウン。",
  },
  {
    href: "/squad",
    icon: "📋",
    title: "代表メンバー",
    desc: "サムライブルー全26名＋スタッフ。経歴・プレースタイルを網羅した名簿。",
  },
  {
    href: "/schedule",
    icon: "🕐",
    title: "試合日程",
    desc: "全試合を日本時間で。深夜・早朝も見逃さない。カレンダー登録もワンタップ。",
  },
  {
    href: "/groups",
    icon: "📊",
    title: "グループ順位表",
    desc: "全12組の組み合わせと勝点。結果をリアルタイム反映。突破圏も一目で。",
  },
  {
    href: "/bracket",
    icon: "🏆",
    title: "決勝トーナメント",
    desc: "ラウンド32〜決勝の流れと日程。日本代表の勝ち上がりマップも。",
  },
  {
    href: "/predictions",
    icon: "🔮",
    title: "勝敗予想",
    desc: "試合の勝敗を予想して的中率を競う。にわかでも自分ごとに楽しめる。",
  },
  {
    href: "/watch",
    icon: "📺",
    title: "どこで見る？",
    desc: "日本の放送・配信ガイド。地上波・DAZNの違い、日本戦を無料で見る方法。",
  },
  {
    href: "/teams",
    icon: "🏴",
    title: "各国図鑑",
    desc: "48カ国の戦術・注目選手・小ネタまで。推し国・推し選手がきっと見つかる。",
  },
  {
    href: "/deep",
    icon: "🔭",
    title: "サッカー深掘り",
    desc: "戦術・観戦術・数字の読み方・用語辞典。にわかから“通”へ解像度を上げる。",
  },
  {
    href: "/predict",
    icon: "🏆",
    title: "識者の優勝予想",
    desc: "世界中の解説者・元代表・統計モデルは誰を本命に？出典付きで総まとめ。",
  },
  {
    href: "/news",
    icon: "📰",
    title: "ニュース",
    desc: "大会の最新情報も、人に話したくなる面白ネタも、まとめてチェック。",
  },
  {
    href: "/guide",
    icon: "🧭",
    title: "100倍ガイド",
    desc: "ルールも観戦のコツも、にわかさん目線で。これを読めば予習はバッチリ。",
  },
  {
    href: "/gen",
    icon: "🐱",
    title: "トリオンの玄人解説",
    desc: "トリオンが忖度なしで語る本音。そこまで言う⁉の強者目線。",
  },
];

export default async function Home() {
  const { matches } = await getMatches();
  const japanMatches = matches
    .filter((m) => m.homeCode === "JPN" || m.awayCode === "JPN")
    .sort((a, b) => +new Date(a.utcDate) - +new Date(b.utcDate));

  // トリオンが案内する「次の日本戦」
  const nextJp = japanMatches.find((m) => m.status !== "FINISHED");
  const trionData = nextJp
    ? (() => {
        const oppCode = nextJp.homeCode === "JPN" ? nextJp.awayCode : nextJp.homeCode;
        const opp = getTeam(oppCode);
        return {
          matchId: nextJp.id,
          oppName: opp?.name ?? oppCode,
          oppFlag: opp?.flag ?? "🏳️",
          dateLabel: jstDateLabel(nextJp.utcDate),
          timeLabel: jstTimeLabel(nextJp.utcDate),
          utcDate: nextJp.utcDate,
          comment: judgeWake(nextJp).genComment,
        };
      })()
    : undefined;

  return (
    <div>
      {/* ヒーロー */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="colors-stripe-thin w-24 rounded-full mb-4" />
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              <span className="text-jpred">100倍</span>、
              <br />
              ワールドカップを
              <br />
              <span className="text-jpnavy">楽しもう。</span>
            </h1>
            <p className="text-muted text-lg mb-6 leading-relaxed">
              サッカーをよく知らなくても大丈夫。
              <br />
              日本時間の日程・各国の見どころ・面白ニュースを、
              ぜんぶここで。
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
            <TrionHero data={trionData} />
          </div>
        </div>
      </section>

      {/* 観戦スタイル診断バッジ（未診断は「診断する」バナー、診断済みはレベルチップ） */}
      <HomeQuizBadge />

      {/* 因縁への導線（夜空バナー） */}
      <section className="max-w-6xl mx-auto px-4 pt-6">
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
              <div className="text-[11px] text-white/60 tracking-widest mb-1">
                🌙 因縁
              </div>
              <p className="font-bold leading-snug">
                試合は、物語として読むと100倍になる。
              </p>
              <p className="text-xs text-white/70 mt-1">
                因縁・登場人物・伏線
              </p>
            </div>
            <span className="shrink-0 text-sm font-bold bg-white text-jpnavy rounded-full px-4 py-2">
              読む →
            </span>
          </div>
        </Link>
      </section>

      {/* マイ推し（推し登録があれば表示） */}
      <MyFavorites teamMap={teamMap} />

      {/* 日本代表の試合 */}
      <section className="max-w-6xl mx-auto px-4 py-12">
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
                    <span className="font-bold text-lg">
                      {jstDateLabel(m.utcDate)}
                    </span>
                    <span className="font-mono font-bold text-lg">
                      {jstTimeLabel(m.utcDate)}
                    </span>
                    <span className="text-xs text-muted">JST</span>
                  </div>
                  {hint && (
                    <div className="text-xs text-jpred font-medium mt-1">
                      {hint}
                    </div>
                  )}
                  {(m.city || m.stadium) && (
                    <div className="mt-2 flex items-start gap-1.5 text-xs text-muted">
                      <span aria-hidden>📍</span>
                      <span>
                        {m.city}
                        {m.stadium && (
                          <span className="text-foreground/70">
                            ・{m.stadium}
                          </span>
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
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/japan"
            className="text-sm font-bold text-jpnavy hover:underline"
          >
            🇯🇵 日本特集（攻略・突破条件）を見る →
          </Link>
          <Link
            href="/schedule"
            className="text-sm font-medium text-jpnavy hover:underline"
          >
            全試合の日程を見る →
          </Link>
        </div>
      </section>

      {/* 機能カード */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-5">
          <Image
            src="/char-ball.png"
            alt=""
            width={120}
            height={193}
            className="h-16 w-auto shrink-0 drop-shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">⚽ もっと深掘りする</h2>
            <span className="text-sm text-muted">
              日程・図鑑・ニュース・ガイド。気になるところからどうぞ。
            </span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group bg-surface border border-line rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-1 hover:border-jpnavy/50 hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl mb-3">
                  {f.href === "/gen" ? (
                    <Image
                      src="/trion.png"
                      alt="トリオン"
                      width={48}
                      height={48}
                      className="object-contain drop-shadow"
                    />
                  ) : (
                    f.icon
                  )}
                </div>
                <span
                  className="text-jpnavy/40 text-xl group-hover:text-jpnavy group-hover:translate-x-0.5 transition-all"
                  aria-hidden
                >
                  ›
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-jpnavy">
                ひらく <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
