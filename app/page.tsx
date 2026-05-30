import Link from "next/link";
import Image from "next/image";
import { getMatches } from "@/lib/football";
import { scoreMatch } from "@/lib/matchScore";
import MatchCard from "@/components/schedule/MatchCard";

export const revalidate = 60;

const features = [
  {
    href: "/schedule",
    icon: "🕐",
    title: "試合日程",
    desc: "全試合を日本時間で。深夜・早朝の試合も見逃さない。リマインド登録もワンタップ。",
  },
  {
    href: "/teams",
    icon: "🏴",
    title: "各国図鑑",
    desc: "戦術・注目選手・小ネタまで。推し国・推し選手がきっと見つかる。",
  },
  {
    href: "/deep",
    icon: "🔭",
    title: "サッカー深掘り",
    desc: "戦術・観戦術・数字の読み方・用語辞典。にわかから“通”へ解像度を上げる。",
  },
  {
    href: "/predict",
    icon: "🔮",
    title: "みんなの優勝予想",
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
];

export default async function Home() {
  const { matches } = await getMatches();
  const upcoming = matches
    .filter((m) => m.status !== "FINISHED")
    .sort((a, b) => +new Date(a.utcDate) - +new Date(b.utcDate));
  const featured = [...upcoming]
    .sort((a, b) => scoreMatch(b).total - scoreMatch(a).total)
    .slice(0, 3);

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
                href="/schedule"
                className="px-5 py-2.5 rounded-full bg-jpnavy text-white font-medium hover:opacity-90 transition-opacity"
              >
                試合日程を見る
              </Link>
              <Link
                href="/teams"
                className="px-5 py-2.5 rounded-full border border-jpnavy text-jpnavy font-medium hover:bg-jpnavy hover:text-white transition-colors"
              >
                各国図鑑を見る
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-jpnavy/5 rounded-full blur-3xl" />
              <Image
                src="/mascot-v2.png"
                alt="ワールドカップ人間くん"
                width={256}
                height={620}
                priority
                className="relative drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 今夜見るべき試合 */}
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
            <h2 className="text-2xl font-bold">🔥 見るべき試合ナビ</h2>
            <span className="text-sm text-muted">
              番狂わせ度・ドラマ度から自動ピックアップ
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/schedule"
            className="text-sm font-medium text-jpnavy hover:underline"
          >
            すべての日程を見る →
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
              className="bg-surface border border-line rounded-2xl p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
