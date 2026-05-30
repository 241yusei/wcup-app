import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, getTeam } from "@/data/teams";

export function generateStaticParams() {
  return teams.map((t) => ({ code: t.code }));
}

export default async function TeamDetail({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const team = getTeam(code);
  if (!team) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/teams" className="text-sm text-muted hover:text-jpnavy">
        ← 各国図鑑にもどる
      </Link>

      <header className="mt-4 mb-8 rounded-2xl overflow-hidden border border-line">
        <div className="h-2" style={{ backgroundColor: team.themeColor }} />
        <div className="bg-surface p-6 flex items-center gap-4">
          <span className="text-6xl">{team.flag}</span>
          <div>
            <h1 className="text-3xl font-bold">{team.name}</h1>
            <p className="text-muted">
              {team.nickname}
              {team.fifaRank ? `・FIFAランク ${team.fifaRank}位` : ""}
            </p>
          </div>
        </div>
        {team.whyWatch && (
          <div className="bg-jpnavy text-white px-6 py-3 text-sm font-medium flex gap-2 items-start">
            <span aria-hidden>👀</span>
            <span className="leading-relaxed">{team.whyWatch}</span>
          </div>
        )}
      </header>

      {team.briefing && team.briefing.length > 0 && (
        <section className="mb-10">
          <div className="rounded-2xl border-2 border-jpnavy/15 bg-surface overflow-hidden">
            <div className="colors-stripe-thin h-1.5 w-full" />
            <div className="p-5 sm:p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-1">
                ⚽ 試合前にこれだけは知っておくべき{team.briefing.length}つのこと
              </h2>
              <p className="text-xs text-muted mb-5">
                {team.name}の試合を100倍楽しむ予習。これさえ読めば「にわか」卒業。
              </p>
              <ol className="space-y-4">
                {team.briefing.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-jpnavy text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base" aria-hidden>
                          {b.icon}
                        </span>
                        <span className="font-bold">{b.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-line text-muted">
                          {b.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed mt-1">
                        {b.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="text-[11px] text-muted mt-5 pt-4 border-t border-line">
                ※ 招集・負傷などの時事情報は各公式発表・報道をもとに編集部が要約。最新の状況は変動する場合があります。
              </p>
            </div>
          </div>
        </section>
      )}

      <Section title="⚔️ 戦術の特徴">
        <p className="leading-relaxed">{team.tactics}</p>
      </Section>

      <Section title="📈 直近の状況">
        <p className="leading-relaxed">{team.recent}</p>
      </Section>

      <Section title="⭐ 注目選手">
        <div className="space-y-3">
          {team.players.map((p) => (
            <div
              key={p.name}
              className="bg-surface border border-line rounded-xl p-4"
            >
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-bold text-lg">{p.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-jpnavy text-white">
                  {p.position}
                </span>
                <span className="text-xs text-muted">{p.club}</span>
              </div>
              <p className="text-sm text-muted mt-1">{p.why}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="🎉 サッカー外の小ネタ">
        <ul className="space-y-2">
          {team.trivia.map((t, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-jpred">●</span>
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <span className="colors-stripe-thin w-6 rounded-full inline-block" />
        {title}
      </h2>
      {children}
    </section>
  );
}
