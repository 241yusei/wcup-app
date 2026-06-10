import Link from "next/link";
import Image from "next/image";
import { gen, proSections } from "@/data/proCommentary";

export const metadata = {
  title: "トリオンの玄人解説｜そこまで言う⁉ 忖度なしの本音｜100倍Wカップ",
  description:
    "隠れキャラ「トリオン」が、にわか向けの優しさ抜きで語る玄人解説。日本の本当の強みと泣き所、初戦オランダ攻略の核心、勝負を決める“3秒”、優勝の読みまで。サッカー強者目線の忖度なし分析。",
};

export default function GenPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ヒーロー */}
      <header className="mb-8 rounded-2xl overflow-hidden border border-line">
        <div className="colors-stripe-thin w-full" />
        <div className="bg-jpnavy text-white p-6 flex items-center gap-4">
          <Image
            src="/char-ball.png"
            alt="トリオン"
            width={120}
            height={193}
            className="h-28 w-auto shrink-0 drop-shadow-xl"
          />
          <div>
            <div className="text-xs text-white/70 mb-1">
              🐾 {gen.fullName}の
            </div>
            <h1 className="text-3xl font-bold mb-1">{gen.pageTitle}</h1>
            <p className="text-white/80 text-sm">{gen.tagline}</p>
          </div>
        </div>
        <div className="bg-surface p-5">
          <p className="text-sm leading-relaxed">{gen.intro}</p>
        </div>
      </header>

      {/* 三行まとめ */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="colors-stripe-thin w-6 rounded-full inline-block" />
          まず、トリオンの三行まとめ
        </h2>
        <div className="rounded-2xl border-2 border-jpred/30 bg-jpred/[0.04] p-4 space-y-2">
          {gen.tldr.map((t, i) => (
            <div key={i} className="flex gap-2.5 text-sm leading-relaxed font-medium">
              <span className="shrink-0 w-5 h-5 rounded-full bg-jpred text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* 解説セクション */}
      <div className="space-y-8">
        {proSections.map((s) => (
          <section key={s.id}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="colors-stripe-thin w-6 rounded-full inline-block" />
              <span aria-hidden>{s.icon}</span>
              {s.title}
            </h2>
            <div className="rounded-2xl border border-line bg-surface p-5">
              {s.lead && (
                <p className="text-sm font-bold text-jpnavy mb-3 leading-relaxed">
                  「{s.lead}」
                </p>
              )}
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm text-muted leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {s.punch && (
                <div className="mt-4 rounded-xl bg-jpnavy text-white p-3.5 flex gap-2.5">
                  <span className="text-lg shrink-0" aria-hidden>
                    🐱
                  </span>
                  <p className="text-sm leading-relaxed font-medium">{s.punch}</p>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <p className="text-[11px] text-muted mt-8 leading-relaxed">
        ※ 戦術プロファイルは取材・公開情報に基づく分析、勝敗の見立て・予想は「トリオン」の
        一つの見方です。にわかさん向けのやさしい解説は
        <Link href="/deep" className="text-jpnavy underline underline-offset-2 decoration-jpnavy/40">
          サッカー深掘り
        </Link>
        や
        <Link href="/guide" className="text-jpnavy underline underline-offset-2 decoration-jpnavy/40">
          100倍ガイド
        </Link>
        へ。
      </p>

      <div className="mt-4 flex flex-wrap gap-4">
        <Link href="/japan" className="text-sm font-bold text-jpnavy underline underline-offset-2 decoration-jpnavy/40 hover:decoration-jpnavy">
          🇯🇵 日本特集（攻略・突破条件）→
        </Link>
        <Link href="/deep" className="text-sm font-medium text-jpnavy underline underline-offset-2 decoration-jpnavy/40 hover:decoration-jpnavy">
          🔭 サッカー深掘り →
        </Link>
      </div>
    </div>
  );
}
