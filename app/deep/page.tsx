import Link from "next/link";
import Image from "next/image";
import {
  roadmap,
  perspectiveTips,
  tacticsKeywords,
  proWatchPoints,
  statsGuide,
  talkingPoints,
  glossary,
} from "@/data/deepdive";
import SectionTabs, { LEARN_TABS } from "@/components/layout/SectionTabs";

export const metadata = {
  title: "サッカー深掘り｜にわかから“通”へ｜100倍Wカップ",
  description:
    "観戦の解像度を上げる深掘りコーナー。戦術キーワード・ボールから目を離す観戦術・数字（xG等）の読み方・用語辞典まで。にわかから“通”へステップアップ。",
};

const sectionNav = [
  { href: "#roadmap", label: "🗺️ ロードマップ" },
  { href: "#perspective", label: "🔄 視点を変える" },
  { href: "#tactics", label: "🧠 戦術キーワード" },
  { href: "#pro", label: "🔭 通の観戦術" },
  { href: "#stats", label: "📊 数字の読み方" },
  { href: "#talk", label: "💬 語れる小ネタ" },
  { href: "#glossary", label: "📖 用語辞典" },
];

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 text-lg font-bold mb-3 flex items-center gap-2"
    >
      <span className="colors-stripe-thin w-6 rounded-full inline-block" />
      {children}
    </h2>
  );
}

export default function DeepPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="colors-stripe-thin w-16 rounded-full mb-3" />
          <h1 className="text-3xl font-bold mb-1">サッカー深掘り</h1>
          <p className="text-muted">
            「ボールを追う」だけじゃもったいない。
            <strong className="text-jpnavy">にわかから“通”へ</strong>
            、観戦の解像度を一段あげる読みもの。
          </p>
        </div>
        <Image
          src="/char-fan.png"
          alt=""
          width={120}
          height={285}
          className="hidden sm:block h-28 w-auto shrink-0 drop-shadow-lg"
        />
      </header>

      <SectionTabs items={LEARN_TABS} title="学ぶ" />

      {/* セクション内ナビ */}
      <nav className="mb-10 flex flex-wrap gap-2">
        {sectionNav.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-line bg-surface text-jpnavy hover:border-jpnavy transition-colors"
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* ロードマップ */}
      <section className="mb-12">
        <SectionTitle id="roadmap">🗺️ 観戦レベル・ロードマップ</SectionTitle>
        <p className="text-sm text-muted mb-4">
          サッカーの楽しみ方には“伸びしろ”があります。今の自分がどこにいて、次に何を見ればいいか。3段階でチェック。
        </p>
        <div className="space-y-3">
          {roadmap.map((r, i) => (
            <div
              key={r.level}
              className="bg-surface border border-line rounded-2xl p-5 relative overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5"
                style={{
                  backgroundColor: ["#4caf50", "#2f6fed", "#d7282f"][i] ?? "#14224f",
                }}
              />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl" aria-hidden>
                  {r.emoji}
                </span>
                <span className="font-bold text-jpnavy">{r.level}</span>
                <span className="text-sm text-muted">— {r.catch}</span>
              </div>
              <p className="text-sm leading-relaxed">{r.watching}</p>
              <p className="text-xs text-muted mt-2 pt-2 border-t border-line">
                <span className="font-bold text-jpred">NEXT ▶</span> {r.nextStep}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 視点を変えるコツ */}
      <section className="mb-12">
        <SectionTitle id="perspective">🔄 観る視点を変えるコツ</SectionTitle>
        <p className="text-sm text-muted mb-4">
          ボールを追うのをやめると、見えてくる世界がある。今日の試合からすぐ試せる6つ。
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {perspectiveTips.map((t) => (
            <div
              key={t.title}
              className="bg-surface border border-line rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl" aria-hidden>
                  {t.icon}
                </span>
                <span className="font-bold text-sm">{t.title}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 戦術キーワード */}
      <section className="mb-12">
        <SectionTitle id="tactics">🧠 これで通ぶれる・戦術キーワード12</SectionTitle>
        <p className="text-sm text-muted mb-4">
          中継や解説で飛び交うコトバを、たとえ話でスッキリ理解。各カードの
          <span className="text-jpnavy font-medium">「👁 ここを見る」</span>
          で観戦中の着眼点もセットに。
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {tacticsKeywords.map((k) => (
            <div
              key={k.term}
              className="bg-surface border border-line rounded-xl p-4 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl" aria-hidden>
                  {k.icon}
                </span>
                <span className="font-bold text-sm">{k.term}</span>
              </div>
              <span className="text-[11px] text-jpnavy font-medium mb-2">
                {k.short}
              </span>
              <p className="text-sm text-muted leading-relaxed flex-1">{k.body}</p>
              <p className="text-xs text-foreground/80 mt-3 pt-2 border-t border-line">
                <span className="font-bold">👁 ここを見る</span> {k.watchTip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 通の観戦術 */}
      <section className="mb-12">
        <SectionTitle id="pro">🔭 “通”の観戦ポイント</SectionTitle>
        <p className="text-sm text-muted mb-4">
          ボールから目を離した先に、勝負を決める駆け引きがある。マニアが夢中になる8つの着眼点。
        </p>
        <div className="space-y-3">
          {proWatchPoints.map((p) => (
            <div
              key={p.title}
              className="bg-surface border border-line rounded-xl p-4 flex gap-3"
            >
              <span className="text-2xl shrink-0" aria-hidden>
                {p.icon}
              </span>
              <div>
                <div className="font-bold text-sm">{p.title}</div>
                <p className="text-sm text-muted leading-relaxed mt-1">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 数字の読み方 */}
      <section className="mb-12">
        <SectionTitle id="stats">📊 数字（スタッツ）の読み方</SectionTitle>
        <p className="text-sm text-muted mb-4">
          画面に出る数字を「で、何が分かるの？」に翻訳。
          <span className="text-jpred font-medium">⚠️ 落とし穴</span>
          まで知れば、もう数字に騙されない。
        </p>
        <div className="space-y-3">
          {statsGuide.map((s) => (
            <div
              key={s.stat}
              className="bg-surface border border-line rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl" aria-hidden>
                  {s.icon}
                </span>
                <span className="font-bold text-sm">{s.stat}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{s.means}</p>
              <p className="text-xs leading-relaxed mt-2 px-3 py-2 rounded-lg bg-jpred/5 border border-jpred/15">
                <span className="font-bold text-jpred">⚠️ 落とし穴</span> {s.trap}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 語れる小ネタ */}
      <section className="mb-12">
        <SectionTitle id="talk">💬 “通”っぽく語れる観戦小ネタ</SectionTitle>
        <p className="text-sm text-muted mb-4">
          隣の人に話したくなる、知ってると一段深い豆知識。「お、分かってるね」と言われる8選。
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {talkingPoints.map((t) => (
            <div
              key={t.title}
              className="bg-surface border border-line rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl" aria-hidden>
                  {t.icon}
                </span>
                <span className="font-bold text-sm">{t.title}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 用語辞典 */}
      <section className="mb-10">
        <SectionTitle id="glossary">📖 サッカー用語辞典</SectionTitle>
        <p className="text-sm text-muted mb-4">
          中継・SNS・解説で出会うコトバを一言で。約50語をカテゴリ別に。分からない言葉が出たらここへ。
        </p>
        <div className="space-y-6">
          {glossary.map((g) => (
            <div key={g.category}>
              <h3 className="text-sm font-bold mb-2 text-jpnavy">{g.category}</h3>
              <dl className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                {g.terms.map((t) => (
                  <div
                    key={t.term}
                    className="border-b border-line/70 pb-2"
                  >
                    <dt className="text-sm font-bold flex items-baseline gap-1.5 flex-wrap">
                      {t.term}
                      {t.reading && (
                        <span className="text-[10px] font-normal text-muted">
                          {t.reading}
                        </span>
                      )}
                    </dt>
                    <dd className="text-xs text-muted leading-relaxed mt-0.5">
                      {t.def}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-line bg-surface p-6 flex items-center gap-4">
        <Image
          src="/char-ball.png"
          alt=""
          width={120}
          height={193}
          className="h-20 w-auto shrink-0 drop-shadow-md"
        />
        <div>
          <p className="text-sm font-bold mb-2">
            知識を仕入れたら、あとは“推し”を見つけて観るだけ。
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/teams"
              className="text-sm font-medium text-jpnavy hover:underline"
            >
              各国図鑑で推しを探す →
            </Link>
            <Link
              href="/schedule"
              className="text-sm font-medium text-jpnavy hover:underline"
            >
              日本時間の日程を見る →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
