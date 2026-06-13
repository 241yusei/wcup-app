import Link from "next/link";
import Image from "next/image";
import {
  predictions,
  tallyByCountry,
  regionOrder,
  type Region,
} from "@/data/predictions";
import SectionTabs, { PREDICT_TABS } from "@/components/layout/SectionTabs";

export const metadata = {
  title: "みんなの優勝予想｜世界の識者は誰を本命に？｜100倍Wカップ",
  description:
    "世界中の解説者・元代表・監督・記者・統計モデルが公表した2026ワールドカップの優勝予想を、出典付きで総まとめ。誰が一番予想されているのか、票数ランキングも。",
};

const medal = ["🥇", "🥈", "🥉"];

export default function PredictPage() {
  const tally = tallyByCountry();
  const top = tally[0];
  const maxCount = top?.count ?? 1;
  const grouped = regionOrder
    .map((r) => ({ region: r, items: predictions.filter((p) => p.region === r) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="colors-stripe-thin w-16 rounded-full mb-3" />
          <h1 className="text-3xl font-bold mb-1">みんなの優勝予想</h1>
          <p className="text-muted">
            世界中の
            <strong className="text-jpnavy">識者は誰を本命に推すのか</strong>
            。解説者・元代表・監督・記者・統計モデルが公表した予想を、
            すべて出典付きで集めました。
          </p>
        </div>
        <Image
          src="/char-ball.png"
          alt=""
          width={120}
          height={193}
          className="hidden sm:block h-28 w-auto shrink-0 drop-shadow-lg"
        />
      </header>

      <SectionTabs items={PREDICT_TABS} title="予想" />

      {predictions.length === 0 ? (
        <p className="text-muted text-sm">予想データを準備中です。</p>
      ) : (
        <>
          {/* 票数ランキング */}
          <section className="mb-10">
            <h2 className="scroll-mt-20 text-lg font-bold mb-3 flex items-center gap-2">
              <span className="colors-stripe-thin w-6 rounded-full inline-block" />
              📊 優勝予想ランキング（{predictions.length}人の予想を集計）
            </h2>
            <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <p className="text-sm text-muted mb-4">
                今いちばん多く本命に挙げられているのは
                <strong className="text-jpred">
                  {top?.flag} {top?.country}
                </strong>
                （{top?.count}票）。
              </p>
              <ul className="space-y-2.5">
                {tally.map((t, i) => (
                  <li key={t.country} className="flex items-center gap-3">
                    <span className="w-6 text-center text-sm font-bold text-muted shrink-0">
                      {medal[i] ?? i + 1}
                    </span>
                    <span className="w-28 sm:w-32 shrink-0 text-sm font-bold">
                      {t.flag} {t.country}
                    </span>
                    <span className="flex-1 h-3 rounded-full bg-line/70 overflow-hidden">
                      <span
                        className="block h-full rounded-full bg-jpnavy"
                        style={{ width: `${(t.count / maxCount) * 100}%` }}
                      />
                    </span>
                    <span className="w-10 text-right text-sm font-bold text-jpnavy shrink-0">
                      {t.count}票
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[11px] text-muted mt-2 leading-relaxed">
              ※ 各予想は本人の発言・記事・動画・SNS、または統計モデルの公表結果を出典としています。
              数値や順位は時期により変動します。
            </p>
          </section>

          {/* 地域別の予想一覧 */}
          {grouped.map((g) => (
            <section key={g.region} className="mb-10">
              <h2 className="scroll-mt-20 text-lg font-bold mb-3 flex items-center gap-2">
                <span className="colors-stripe-thin w-6 rounded-full inline-block" />
                {regionLabel(g.region)}
              </h2>
              <div className="space-y-3">
                {g.items.map((p) => (
                  <article
                    key={p.name + p.source}
                    className="rounded-2xl border border-line bg-surface p-4 sm:p-5"
                  >
                    {/* 本命国：カード上部に大きく明示（スマホでも一目で分かる） */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[11px] font-bold text-muted shrink-0">
                        本命
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-jpnavy text-white text-base font-bold px-3.5 py-1">
                        <span className="text-lg leading-none">{p.pickFlag}</span>
                        {p.pick}
                      </span>
                    </div>
                    <div className="font-bold leading-snug">
                      {p.flag} {p.name}
                    </div>
                    <div className="text-xs text-muted mt-0.5">{p.role}</div>
                    <p className="text-sm text-muted leading-relaxed mt-3">
                      {p.detail}
                    </p>
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-jpnavy hover:underline mt-3"
                    >
                      🔗 出典：{p.sourceLabel}
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      {/* 導線 */}
      <section className="mb-4">
        <Link
          href="/teams"
          className="group block rounded-2xl border border-jpnavy/20 bg-jpnavy text-white p-6 hover:opacity-95 transition-opacity"
        >
          <div className="text-2xl mb-2">🏴</div>
          <div className="font-bold text-lg mb-1">
            予想された国の“中身”を見てみる
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            なぜその国が本命なのか。戦術・注目選手・観戦前ブリーフィングは各国図鑑でチェック。あなた自身の予想も立ててみよう。
          </p>
          <span className="inline-block text-sm font-medium mt-3 group-hover:underline">
            各国図鑑を見る →
          </span>
        </Link>
      </section>
    </div>
  );
}

function regionLabel(r: Region): string {
  switch (r) {
    case "データ予測":
      return "🤖 統計モデル・スーパーコンピューターの予測";
    case "欧州":
      return "🏴 欧州の識者";
    case "南米・スペイン語圏":
      return "🌎 南米・スペイン語圏の識者";
    case "米国・グローバル":
      return "🗽 米国・グローバルの識者";
    case "日本・アジア":
      return "🇯🇵 日本・アジアの識者";
    default:
      return r;
  }
}
