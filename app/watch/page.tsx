import Link from "next/link";
import {
  tvBroadcast,
  streamingBroadcast,
  japanBroadcast,
  abemaNote,
  daznPricing,
  watchCaveats,
  broadcastAsOf,
} from "@/data/broadcast";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "W杯はどこで見る？｜日本の放送・配信ガイド｜100倍Wカップ",
  description:
    "2026ワールドカップを日本で見る方法を完全ガイド。地上波（NHK・日テレ・フジ）とネット配信（DAZN）の違い、日本戦の放送先、無料で見る方法まで。※2026大会はABEMAに配信権はありません。",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
      <span className="colors-stripe-thin w-6 rounded-full inline-block" />
      {children}
    </h2>
  );
}

export default function WatchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <PageHeader
        eyebrow="観戦ガイド"
        title="W杯はどこで見る？"
        description={
          <>
            2026ワールドカップを日本で見る方法をまとめました。
            <span className="block text-[11px] mt-1">※ {broadcastAsOf}</span>
          </>
        }
      />

      {/* かんたん結論 */}
      <section className="mb-10">
        <div className="rounded-2xl border-2 border-jpnavy bg-jpnavy/[0.04] overflow-hidden">
          <div className="bg-jpnavy text-white px-4 py-3 font-bold flex items-center gap-2">
            <span aria-hidden>✅</span>かんたん結論
          </div>
          <div className="p-4 space-y-3 text-sm leading-relaxed">
            <p>
              <strong className="text-jpnavy">日本戦をタダで見たい</strong> →
              地上波（NHK・日テレ）か、
              <strong className="text-jpnavy">DAZNの無料配信</strong>
              （日本戦は登録不要・無料）でOK。
            </p>
            <p>
              <strong className="text-jpnavy">全試合をネットで見たい</strong> →
              全104試合を配信するのは
              <strong className="text-jpnavy">DAZNだけ</strong>
              （有料プランが必要）。
            </p>
            <p>
              <strong className="text-jpnavy">テレビで色々見たい</strong> →
              NHK BS 4Kが全104試合を網羅。
            </p>
          </div>
        </div>
      </section>

      {/* 2022との違い注意 */}
      <section className="mb-10">
        <div className="rounded-xl border border-jpred/40 bg-jpred/5 p-4 flex gap-2.5">
          <span className="text-xl shrink-0" aria-hidden>
            ⚠️
          </span>
          <p className="text-sm leading-relaxed">{abemaNote}</p>
        </div>
      </section>

      {/* 日本代表3戦の放送先 */}
      <section className="mb-10">
        <SectionTitle>🇯🇵 日本代表3戦はどこで見る？</SectionTitle>
        <div className="space-y-2">
          {japanBroadcast.map((j) => (
            <div
              key={j.setsu}
              className="rounded-xl border border-jpred/30 bg-surface p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-jpred">{j.setsu}</span>{" "}
                  <span className="font-bold">日本 vs {j.opp}</span>
                </div>
                <span className="text-xs font-mono text-muted">{j.jst} JST</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <span>
                  📺 <span className="font-medium">{j.tv}</span>
                </span>
                <span className="text-[#4caf50] font-bold">🆓 {j.free}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* テレビ */}
      <section className="mb-10">
        <SectionTitle>📺 テレビ放送（地上波・BS）</SectionTitle>
        <div className="space-y-2">
          {tvBroadcast.map((b) => (
            <div key={b.name} className="rounded-xl border border-line bg-surface p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">{b.name}</span>
                {b.free ? (
                  <span className="text-[10px] font-bold bg-[#4caf50] text-white rounded-full px-2 py-0.5">
                    無料
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-line text-muted rounded-full px-2 py-0.5">
                    受信料制
                  </span>
                )}
              </div>
              <p className="text-xs text-muted leading-relaxed">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 配信 */}
      <section className="mb-10">
        <SectionTitle>📱 ネット配信</SectionTitle>
        <div className="space-y-2">
          {streamingBroadcast.map((b) => (
            <div key={b.name} className="rounded-xl border border-line bg-surface p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">{b.name}</span>
                {b.free && (
                  <span className="text-[10px] font-bold bg-[#4caf50] text-white rounded-full px-2 py-0.5">
                    日本戦は無料
                  </span>
                )}
              </div>
              <p className="text-xs text-muted leading-relaxed">{b.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-line bg-surface p-3">
          <div className="text-xs font-bold mb-1.5">
            💴 DAZN料金（日本戦以外もネットで見たい人向け）
          </div>
          <ul className="space-y-1">
            {daznPricing.map((p, i) => (
              <li key={i} className="text-xs text-muted flex gap-2">
                <span className="text-jpnavy">›</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 注意書き */}
      <section className="mb-6">
        <p className="text-[11px] font-bold text-muted mb-1">
          ※ 確認・注意（公式番組表で最終確認を）
        </p>
        <ul className="space-y-1">
          {watchCaveats.map((c, i) => (
            <li key={i} className="text-[11px] text-muted leading-relaxed flex gap-1.5">
              <span>・</span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link href="/schedule" className="text-sm font-bold text-jpnavy hover:underline">
          🗓 試合日程（日本時間）→
        </Link>
        <Link href="/japan" className="text-sm font-medium text-jpnavy hover:underline">
          🇯🇵 日本特集 →
        </Link>
      </div>
    </div>
  );
}
