import Link from "next/link";
import Image from "next/image";
import { teams } from "@/data/teams";
import FavoriteStar from "@/components/FavoriteStar";
import PageHeader from "@/components/PageHeader";

export default function TeamsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <PageHeader
        eyebrow="図鑑"
        title="各国図鑑"
        description="戦術の特徴・注目選手・直近の状況・サッカー外の小ネタまで。気になる国をタップ。"
        action={
          <Image
            src="/mascot-ball.png"
            alt=""
            width={84}
            height={204}
            className="hidden sm:block shrink-0 drop-shadow-lg"
          />
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {teams.map((t) => (
          <Link
            key={t.code}
            href={`/teams/${t.code}`}
            className="group bg-surface rounded-2xl border border-line p-4 cursor-pointer transition-all hover:-translate-y-1 hover:border-jpnavy/50 hover:shadow-md active:scale-[0.98] overflow-hidden relative"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: t.themeColor }}
            />
            <div className="absolute top-2 right-2">
              <FavoriteStar code={t.code} />
            </div>
            <div className="text-4xl mb-2">{t.flag}</div>
            <div className="font-bold leading-tight">{t.name}</div>
            <div className="text-xs text-muted">{t.nickname}</div>
            {t.fifaRank && (
              <div className="text-[11px] text-muted mt-1">
                FIFAランク {t.fifaRank}位
              </div>
            )}
            {t.whyWatch && (
              <div className="mt-2 pt-2 border-t border-line text-[11px] text-jpnavy leading-snug line-clamp-3">
                👀 {t.whyWatch}
              </div>
            )}
            <div className="mt-2 text-[11px] font-bold text-jpnavy flex items-center justify-end gap-0.5">
              図鑑を見る
              <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>
                ›
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
