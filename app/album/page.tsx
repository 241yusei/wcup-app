import type { Metadata } from "next";
import Image from "next/image";
import { getMatches } from "@/lib/football";
import { getTeam } from "@/data/teams";
import { jstDateLabel, jstTimeLabel } from "@/lib/datetime";
import AlbumClient, { AlbumMatch } from "@/components/AlbumClient";

export const metadata: Metadata = {
  title: "マイW杯アルバム｜100倍Wカップ",
  description:
    "観た試合のスタンプ・勝敗予想の成績・観戦メモが集まる、自分だけのW杯2026の記録帳。",
};

export default async function AlbumPage() {
  const { matches } = await getMatches();

  const albumMatches: AlbumMatch[] = matches.map((m) => {
    const home = getTeam(m.homeCode);
    const away = getTeam(m.awayCode);
    return {
      id: m.id,
      homeFlag: home?.flag ?? "🏳️",
      awayFlag: away?.flag ?? "🏳️",
      homeName: home?.name ?? m.homeCode,
      awayName: away?.name ?? m.awayCode,
      dateLabel: `${jstDateLabel(m.utcDate)} ${jstTimeLabel(m.utcDate)}`,
      stage: m.stage,
      jp: m.homeCode === "JPN" || m.awayCode === "JPN",
      finished: m.status === "FINISHED",
      homeScore: m.homeScore,
      awayScore: m.awayScore,
    };
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="colors-stripe-thin w-16 rounded-full mb-3" />
          <h1 className="text-3xl font-bold mb-1">マイW杯アルバム</h1>
          <p className="text-muted text-sm leading-relaxed">
            4年に1度の祭典は、終わったら思い出になる。
            <br />
            観た試合・当てた予想・残したメモ——
            <strong className="text-jpnavy">あなただけの大会記録</strong>がここに育つ。
          </p>
        </div>
        <Image
          src="/mascot-ball-side.png"
          alt=""
          width={80}
          height={162}
          className="hidden sm:block shrink-0 drop-shadow-lg"
        />
      </header>

      <AlbumClient matches={albumMatches} />
    </div>
  );
}
