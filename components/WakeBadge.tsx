// 起きる?寝る?ナビの表示バッジ。試合カード・試合詳細で使う。
// サーバーコンポーネント（判定は純関数なのでクライアント不要）。

import { Match } from "@/lib/types";
import { judgeWake } from "@/lib/wakeup";

const HARDSHIP_LABEL: Record<string, string> = {
  midnight: "深夜",
  earlymorning: "早朝",
  daytime: "日中",
  evening: "夜",
};

export default function WakeBadge({
  match,
  detailed = false,
}: {
  match: Match;
  detailed?: boolean;
}) {
  const v = judgeWake(match);
  if (match.status === "FINISHED") return null;

  if (!detailed) {
    // コンパクト版（試合カード用）: 帯1本
    return (
      <div className="flex items-center gap-2 text-xs">
        <span aria-hidden>⏰</span>
        <span className="font-bold text-jpnavy">{v.label}</span>
        <span className="text-jpred font-mono tracking-tight">{v.stars}</span>
      </div>
    );
  }

  // 詳細版（試合詳細ページ用）: ゲンの一言つき
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold flex items-center gap-1.5">
          <span aria-hidden>⏰</span> 起きる?寝る?ナビ
          <span className="text-[11px] font-normal text-muted">
            （{HARDSHIP_LABEL[v.hardship]}キックオフ）
          </span>
        </span>
        <span className="text-jpred font-mono font-bold">{v.stars}</span>
      </div>
      <div className="text-lg font-bold text-jpnavy mb-1.5">{v.label}</div>
      <p className="text-sm text-muted leading-relaxed">
        <span className="mr-1" aria-hidden>🐾</span>
        {v.genComment}
      </p>
    </div>
  );
}
