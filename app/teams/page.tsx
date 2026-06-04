import Link from "next/link";
import Image from "next/image";
import { teams } from "@/data/teams";
import FavoriteStar from "@/components/FavoriteStar";

export default function TeamsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="colors-stripe-thin w-16 rounded-full mb-3" />
          <h1 className="text-3xl font-bold mb-1">各国図鑑</h1>
          <p className="text-muted">
            戦術の特徴・注目選手・直近の状況・サッカー外の小ネタまで。気になる国をタップ。
          </p>
        </div>
        <Image
          src="/mascot-ball.png"
          alt=""
          width={84}
          height={204}
          className="hidden sm:block shrink-0 drop-shadow-lg"
        />
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {teams.map((t) => (
          <Link
            key={t.code}
            href={`/teams/${t.code}`}
            className="group bg-surface rounded-2xl border border-line p-4 hover:-translate-y-1 transition-transform overflow-hidden relative"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
