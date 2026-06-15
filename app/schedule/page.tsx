import Image from "next/image";
import Link from "next/link";
import { getMatches } from "@/lib/football";
import { jstDateKey } from "@/lib/datetime";
import { Match } from "@/lib/types";
import ScheduleFavoriteFilter from "@/components/schedule/ScheduleFavoriteFilter";
import SectionTabs, { MATCH_TABS } from "@/components/layout/SectionTabs";
import PageHeader from "@/components/PageHeader";

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
      <PageHeader
        eyebrow="試合"
        title="試合日程"
        description={
          <>
            <p>
              すべて<strong className="text-jpnavy">日本時間</strong>で表示。各試合に
              <strong className="text-jpnavy">📺 どこで観れるか</strong>も表示。
              🔔でカレンダー登録できます。
            </p>
            <p className="text-xs mt-2">
              ⭐ 推し国を登録すると「推し国フィルター」が使えます。
            </p>
            <p className="text-xs mt-2">
              <Link href="/watch" className="font-bold text-jpnavy hover:underline">
                📺 どこで観れる？ 放送・配信ガイド →
              </Link>
            </p>
          </>
        }
        action={
          <Image
            src="/mascot-ball-side.png"
            alt=""
            width={101}
            height={204}
            className="hidden sm:block shrink-0 drop-shadow-lg"
          />
        }
      />

      <SectionTabs items={MATCH_TABS} title="試合" />

      {/* 推し国フィルター付きの日程ビュー（クライアントコンポーネント） */}
      <ScheduleFavoriteFilter groups={groups} live={live} />
    </div>
  );
}
