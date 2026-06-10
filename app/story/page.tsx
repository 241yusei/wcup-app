import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { stories } from "@/data/stories";
import { getMatches } from "@/lib/football";
import { getTeam } from "@/data/teams";
import { jstDateLabel, jstTimeLabel } from "@/lib/datetime";
import WakeBadge from "@/components/WakeBadge";

export const metadata: Metadata = {
  title: "因縁帖｜100倍Wカップ",
  description:
    "W杯2026の試合を「物語」として読む。因縁・登場人物・伏線・結末予想——語り部はボールネコのゲン。",
};

export default async function StoryPage() {
  const { matches } = await getMatches();
  const byId = new Map(matches.map((m) => [m.id, m]));

  // 試合日時順に並べる
  const ordered = [...stories].sort((a, b) => {
    const ma = byId.get(a.matchId);
    const mb = byId.get(b.matchId);
    if (!ma || !mb) return 0;
    return +new Date(ma.utcDate) - +new Date(mb.utcDate);
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* 夜空ヒーロー */}
      <header className="mb-10 rounded-2xl bg-jpnavy text-white p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 15% 25%, white, transparent), radial-gradient(1.5px 1.5px at 75% 15%, white, transparent), radial-gradient(1px 1px at 50% 60%, white, transparent), radial-gradient(1px 1px at 90% 70%, white, transparent), radial-gradient(1.5px 1.5px at 30% 85%, white, transparent)",
          }}
          aria-hidden
        />
        <div className="relative">
          <div className="colors-stripe-thin w-16 rounded-full mb-4" />
          <h1 className="text-3xl font-bold mb-3">因縁帖</h1>
          <p className="text-sm text-white/85 leading-relaxed max-w-md">
            スコアやスタッツは、他のアプリでも読める。
            <br />
            ここにあるのは<strong className="text-white">物語</strong>だ。
            因縁、登場人物、張られた伏線——
            <br />
            キックオフの笛は、物語の最初のページをめくる音になる。
          </p>
          <p className="text-xs text-white/50 mt-4">語り部：ボールネコのゲン 🐾</p>
        </div>
      </header>

      {/* 章立て */}
      <div className="space-y-4">
        {ordered.map((s) => {
          const m = byId.get(s.matchId);
          if (!m) return null;
          const home = getTeam(m.homeCode);
          const away = getTeam(m.awayCode);
          const jp = m.homeCode === "JPN" || m.awayCode === "JPN";
          return (
            <Link
              key={s.matchId}
              href={`/matches/${s.matchId}#story`}
              className={`block rounded-2xl border-2 bg-surface p-5 hover:shadow-lg transition-shadow relative overflow-hidden ${
                jp ? "border-jpred" : "border-jpnavy/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[11px] font-bold tracking-widest ${
                    jp ? "text-jpred" : "text-jpnavy"
                  }`}
                >
                  🌙 {s.chapter}
                </span>
                <span className="text-xs text-muted font-mono">
                  {jstDateLabel(m.utcDate)} {jstTimeLabel(m.utcDate)}
                </span>
              </div>
              <h2 className="text-lg font-bold leading-snug mb-2">{s.title}</h2>
              <div className="text-sm text-muted mb-3 flex items-center gap-1.5">
                <span>{home?.flag}</span>
                {home?.name}
                <span className="text-xs">vs</span>
                {away?.name}
                <span>{away?.flag}</span>
              </div>
              <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">
                {s.hook}
              </p>
              <div className="flex items-center justify-between">
                <WakeBadge match={m} />
                <span className="text-xs font-bold text-jpnavy">読む →</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
        <Image
          src="/char-ball.png"
          alt=""
          width={60}
          height={97}
          className="shrink-0 drop-shadow"
        />
        <p className="text-sm text-muted leading-relaxed">
          物語は試合とともに増えていく。決勝トーナメントが始まれば、新しい夜の章が書き足される。
          <strong className="text-jpnavy">ブックマーク推奨だ。</strong>
        </p>
      </div>
    </div>
  );
}
