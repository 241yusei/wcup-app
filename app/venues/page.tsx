import Link from "next/link";
import SectionTabs, { MATCH_TABS } from "@/components/layout/SectionTabs";
import PageHeader from "@/components/PageHeader";
import { venues, type Venue } from "@/data/venues";

export const metadata = {
  title: "スタジアム・開催都市ガイド｜16会場まるわかり｜100倍Wカップ",
  description:
    "2026ワールドカップの開催16都市・16スタジアムを完全ガイド。アメリカ11・カナダ2・メキシコ3。収容人数、担当ラウンド（開幕戦・決勝・準決勝ほか）、各会場の見どころまで。",
};

function VenueCard({ v }: { v: Venue }) {
  return (
    <div
      className={`rounded-2xl border bg-surface overflow-hidden ${
        v.highlight ? "border-jpred/50 ring-1 ring-jpred/15" : "border-line"
      }`}
    >
      <div className="colors-stripe-thin w-full" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg" aria-hidden>
                {v.country}
              </span>
              <h3 className="font-bold leading-tight">{v.city}</h3>
            </div>
            <p className="text-xs text-muted mt-0.5">{v.stadium}</p>
          </div>
          <span className="shrink-0 text-[11px] font-bold text-muted bg-line/60 rounded-full px-2 py-1">
            👥 {v.capacity}
          </span>
        </div>
        <p className="text-xs leading-relaxed mt-2">{v.note}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {v.rounds.map((r) => (
            <span
              key={r}
              className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${
                r === "決勝" || r === "開幕戦"
                  ? "bg-jpred text-white"
                  : "bg-jpnavy/10 text-jpnavy"
              }`}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VenuesPage() {
  const byCountry: { flag: string; name: string; list: Venue[] }[] = [
    { flag: "🇺🇸", name: "アメリカ（11会場）", list: venues.filter((v) => v.country === "🇺🇸") },
    { flag: "🇲🇽", name: "メキシコ（3会場）", list: venues.filter((v) => v.country === "🇲🇽") },
    { flag: "🇨🇦", name: "カナダ（2会場）", list: venues.filter((v) => v.country === "🇨🇦") },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <PageHeader
        eyebrow="試合"
        title="スタジアム・開催都市"
        description={
          <>
            史上初の3カ国共催。
            <strong className="text-jpnavy">16都市・16会場</strong>
            を予習して、観戦の臨場感を100倍に。
          </>
        }
      />

      <SectionTabs items={MATCH_TABS} title="試合" />

      {byCountry.map((c) => (
        <section key={c.name} className="mb-8">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span aria-hidden>{c.flag}</span>
            {c.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.list.map((v) => (
              <VenueCard key={v.key} v={v} />
            ))}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap gap-4">
        <Link href="/schedule" className="text-sm font-bold text-jpnavy hover:underline">
          📅 どの会場でいつ試合がある？日程へ →
        </Link>
        <Link href="/watch" className="text-sm font-medium text-jpnavy hover:underline">
          📺 日本での視聴ガイド →
        </Link>
      </div>
    </div>
  );
}
