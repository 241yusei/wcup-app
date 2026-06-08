import Image from "next/image";
import { getMatches } from "@/lib/football";
import { jstDateKey } from "@/lib/datetime";
import { Match } from "@/lib/types";
import ScheduleFavoriteFilter from "@/components/schedule/ScheduleFavoriteFilter";

export default async function SchedulePage() {
  const { matches, live } = await getMatches();

  const sorted = [...matches].sort(
    (a, b) => +new Date(a.utcDate) - +new Date(b.utcDate)
  );

  // 日本時間の日付ごとにグループ化（クライアントに渡せるシリアライズ可能な配列へ変換）
  const dateMap = new Map<string, Match[]>();
  for (const m of sorted) {
    const key = jstDateKey(m.utcDate);
    if (!dateMap.has(key)) dateMap.set(key, []);
    dateMap.get(key)!.push(m);
  }
  const groups = [...dateMap.entries()].map(([dateKey, ms]) => ({
    dateKey,
    matches: ms,
  }));

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
            ⭐ 推し国を登録すると「推し国フィルター」が使えます。
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

      {/* 推し国フィルター付きの日程ビュー（クライアントコンポーネント） */}
      <ScheduleFavoriteFilter groups={groups} live={live} />
    </div>
  );
}
