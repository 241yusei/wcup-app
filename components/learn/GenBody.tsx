import Link from "next/link";
import Image from "next/image";
import { gen, proSections } from "@/data/proCommentary";

// 学ぶハブ「トリオン解説」タブの本文（旧 /gen の中身）。
export default function GenBody() {
  return (
    <div>
      {/* ヒーロー */}
      <div className="mb-8 rounded-2xl overflow-hidden border border-line">
        <div className="colors-stripe-thin w-full" />
        <div className="bg-jpnavy text-white p-6 flex items-center gap-4">
          <Image
            src="/char-ball.png"
            alt="トリオン"
            width={120}
            height={193}
            className="h-24 w-auto shrink-0 drop-shadow-xl"
          />
          <div>
            <div className="text-xs text-white/70 mb-1">🐾 {gen.fullName}の</div>
            <h2 className="text-2xl font-bold mb-1">{gen.pageTitle}</h2>
            <p className="text-white/80 text-sm">{gen.tagline}</p>
          </div>
        </div>
        <div className="bg-surface p-5">
          <p className="text-sm leading-relaxed">{gen.intro}</p>
        </div>
      </div>

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
        一つの見方です。やさしい解説は上のタブ「入門ガイド」「深掘り」へ。
      </p>

      <div className="mt-4 flex flex-wrap gap-4">
        <Link
          href="/japan"
          className="text-sm font-bold text-jpnavy underline underline-offset-2 decoration-jpnavy/40 hover:decoration-jpnavy"
        >
          🇯🇵 日本特集（攻略・突破条件）→
        </Link>
      </div>
    </div>
  );
}
