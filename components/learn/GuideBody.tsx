import Link from "next/link";
import Image from "next/image";

// 学ぶハブ「入門ガイド」タブの本文（旧 /guide の中身）。
const basics = [
  { n: "48", label: "出場国", note: "前回の32から拡大。史上最多の国が参加する。" },
  { n: "3", label: "共催国", note: "アメリカ・カナダ・メキシコの3カ国で同時開催。" },
  { n: "104", label: "試合数", note: "約1か月で100試合超。毎日どこかで試合がある。" },
  { n: "6/11", label: "開幕", note: "メキシコの聖地アステカで開幕戦。決勝は7月中旬。" },
];

const rules = [
  {
    icon: "🥅",
    title: "勝敗の決め方",
    body: "相手ゴールにボールを入れたら1点。試合は前後半45分ずつ＝計90分。グループステージは引き分けあり、勝ち＝3点・引き分け＝1点の「勝ち点」で順位を決める。",
  },
  {
    icon: "🚩",
    title: "オフサイドだけ覚えればOK",
    body: "攻撃側が「相手の最終ライン裏で待ち伏せ」するのを禁じるルール。パスが出た瞬間に相手DFより前にいると反則。これさえ知っていれば観戦の8割は分かる。",
  },
  {
    icon: "🟨",
    title: "カードの意味",
    body: "悪質な反則には黄色（警告）と赤色（退場）のカード。赤が出たチームは1人少ない人数で戦うことになり、一気に流れが変わる大事件になる。",
  },
  {
    icon: "⏱️",
    title: "アディショナルタイム",
    body: "ケガの治療などで止まった時間を後半などの最後に追加する。「90分＋7分」のように表示され、ここでの決勝点はドラマになりやすい。",
  },
  {
    icon: "🏆",
    title: "決勝トーナメント",
    body: "各組の1・2位（24チーム）に成績上位の3位8チームを加えた計32チームがラウンド32へ。ここから先は一発勝負で、引き分けなら延長戦、それでも決まらなければPK戦で決着。負けたら終わりの緊張感が魅力。",
  },
];

const tips = [
  {
    icon: "⭐",
    title: "まず「推し」を1人だけ決める",
    body: "全部追う必要はなし。気になる選手や国をひとつ決めるだけで、ニュースも試合も自分ごとになる。各国図鑑で顔とエピソードから選ぶのがおすすめ。",
    href: "/teams",
    cta: "各国図鑑で推しを探す →",
  },
  {
    icon: "🕐",
    title: "日本時間で予定を立てる",
    body: "アメリカ大陸開催なので、日本では深夜・早朝の試合が多い。観たい試合だけリマインド登録しておけば、寝落ちで見逃す悲劇を防げる。",
    href: "/schedule",
    cta: "日本時間の日程を見る →",
  },
  {
    icon: "📖",
    title: "試合前に「3つの予習」をする",
    body: "各国ページの『試合前に知っておくべきこと』を読むだけで、解説のうんちくが10倍分かる。負傷・因縁・国の背景を知ると、ただの試合が物語に変わる。",
    href: "/teams",
    cta: "ブリーフィングを読む →",
  },
  {
    icon: "🗣️",
    title: "誰かと一緒に観る／実況する",
    body: "SNSで実況したり、友達と「どっち勝つ?」と予想し合うだけで盛り上がりは段違い。にわかでも語れる小ネタはニュースページに用意してある。",
    href: "/news",
    cta: "話せる面白ネタを仕入れる →",
  },
];

const personas = [
  { emoji: "🔥", title: "とにかく強いチームが好き", pick: "アルゼンチン・フランス・スペイン", code: "ARG" },
  { emoji: "🥷", title: "番狂わせ・判官びいき", pick: "モロッコ・日本・クロアチア", code: "MAR" },
  { emoji: "🎨", title: "美しいサッカーが見たい", pick: "ブラジル・オランダ・スペイン", code: "BRA" },
  { emoji: "👑", title: "レジェンドの最後を見届けたい", pick: "ポルトガル・アルゼンチン", code: "POR" },
];

export default function GuideBody() {
  return (
    <div>
      <p className="text-muted text-sm mb-8 leading-relaxed">
        サッカーをよく知らなくても大丈夫。
        <strong className="text-jpnavy">にわかさん</strong>
        のための、これだけ予習ガイド。
      </p>

      {/* 3分でわかる2026 */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          🌎 3分でわかる2026ワールドカップ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {basics.map((b) => (
            <div
              key={b.label}
              className="bg-surface border border-line rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-extrabold text-jpnavy">{b.n}</div>
              <div className="text-xs font-bold mt-0.5">{b.label}</div>
              <div className="text-[11px] text-muted mt-1 leading-snug">{b.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* これだけルール */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          📏 これだけ覚えれば観戦できるルール
        </h2>
        <div className="space-y-3">
          {rules.map((r) => (
            <div
              key={r.title}
              className="bg-surface border border-line rounded-xl p-4 flex gap-3"
            >
              <span className="text-2xl shrink-0" aria-hidden>
                {r.icon}
              </span>
              <div>
                <div className="font-bold">{r.title}</div>
                <p className="text-sm text-muted leading-relaxed mt-1">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 楽しむコツ */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          🎉 観戦が100倍楽しくなる4つのコツ
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {tips.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group bg-surface border border-line rounded-2xl p-5 hover:-translate-y-1 transition-transform flex flex-col"
            >
              <div className="text-2xl mb-2" aria-hidden>
                {t.icon}
              </div>
              <div className="font-bold mb-1">{t.title}</div>
              <p className="text-sm text-muted leading-relaxed flex-1">{t.body}</p>
              <span className="text-xs font-medium text-jpnavy mt-3 group-hover:underline">
                {t.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 推し国診断 */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          🧭 タイプ別・推し国の見つけ方
        </h2>
        <div className="flex items-center gap-3 mb-3 rounded-2xl border border-line bg-surface p-4">
          <Image
            src="/char-fan.png"
            alt=""
            width={120}
            height={285}
            className="h-20 w-auto shrink-0 drop-shadow-md"
          />
          <p className="text-sm text-muted leading-relaxed">
            「全部は追えないけど、ひとつだけ推しがほしい」
            <br className="hidden sm:block" />
            そんなあなたへ。タイプから選べば、きっと運命の一国が見つかる。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {personas.map((p) => (
            <Link
              key={p.title}
              href={`/teams/${p.code}`}
              className="bg-surface border border-line rounded-xl p-4 hover:border-jpnavy transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden>
                  {p.emoji}
                </span>
                <span className="font-bold text-sm">{p.title}</span>
              </div>
              <p className="text-xs text-muted mt-2">
                おすすめ：<span className="text-jpnavy font-medium">{p.pick}</span>
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/teams" className="text-sm font-medium text-jpnavy hover:underline">
            すべての国を図鑑で見る →
          </Link>
        </div>
      </section>

      <p className="text-sm text-muted leading-relaxed rounded-2xl border border-line bg-surface p-4">
        🔭 ルールを覚えたら、上のタブ
        <strong className="text-jpnavy">「深掘り」</strong>
        で戦術キーワードや数字の読み方へ。さらに
        <strong className="text-jpnavy">「トリオン解説」</strong>
        では忖度なしの玄人目線も。
      </p>
    </div>
  );
}
