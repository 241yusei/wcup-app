import Image from "next/image";
import { getMatches } from "@/lib/football";
import { jstDateKey, jstDateLabel } from "@/lib/datetime";
import MatchCard from "@/components/schedule/MatchCard";
import { Match } from "@/lib/types";


export default async function SchedulePage() {
  const { matches, live } = await getMatches();

  const sorted = [...matches].sort(
    (a, b) => +new Date(a.utcDate) - +new Date(b.utcDate)
  );

  // 日本時間の日付ごとにグループ化
  const byDate = new Map<string, Match[]>();
  for (const m of sorted) {
    const key = jstDateKey(m.utcDate);
    if (!byDate.has(key)) byDate.set(key, []);
    byDate.get(key)!.push(m);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="colors-stripe-thin w-16 rounded-full mb-3" />
          <h1 className="text-3xl font-bold mb-1">試合日程</h1>
          <p className="text-muted">
            すべて<strong className="text-jpnavy">日本時間</strong>で表示。
            🔔ボタンでカレンダーに登録できます。
          </p>
          <p className="text-xs text-muted mt-2">
            {live
              ? "🟢 ライブデータ取得中（football-data.org）"
              : "📋 サンプル日程を表示中（APIキー設定で自動更新）"}
          </p>
        </div>
        <Image
          src="/mascot-ball-side.png"
          alt=""
          width={101}
          height={204}
          className="hidden sm:block shrink-0 drop-shadow-lg"
        />
      </header>

      <div className="space-y-8">
        {[...byDate.entries()].map(([key, ms]) => {
          return (
            <section key={key}>
              <div className="flex items-center gap-2 mb-3 sticky top-16 bg-background/95 py-2 z-10">
                <h2 className="text-lg font-bold">{jstDateLabel(ms[0].utcDate)}</h2>
                <span className="text-xs text-muted">{ms.length}試合</span>
              </div>
              <div className="space-y-3">
                {ms.map((m) => (
                  <MatchCard key={m.id} match={m} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
