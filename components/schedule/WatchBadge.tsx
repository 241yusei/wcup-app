import { japanBroadcast } from "@/data/broadcast";
import { getTeam } from "@/data/teams";

// 「どこで観れる」を試合カード上で視覚的に示すバッジ。
// ・2026大会は全104試合が DAZN（配信）＋ NHK BS4K（TV）で視聴可。
// ・日本戦は追加で地上波（NHK総合／日テレ ほか）。data/broadcast.ts の確定情報を使用。
export default function WatchBadge({
  homeCode,
  awayCode,
}: {
  homeCode: string;
  awayCode: string;
}) {
  const jp = homeCode === "JPN" || awayCode === "JPN";
  const oppName = jp
    ? getTeam(homeCode === "JPN" ? awayCode : homeCode)?.name
    : undefined;
  const jpTv = jp ? japanBroadcast.find((b) => b.opp === oppName) : undefined;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] font-bold text-muted mr-0.5">📺 観る</span>
      {jpTv ? (
        <>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold rounded-full px-2 py-0.5 bg-[#4caf50] text-white">
            🆓 無料で観れる
          </span>
          <span className="text-[11px] font-bold rounded-full px-2 py-0.5 bg-jpred/10 text-jpred border border-jpred/30">
            {jpTv.tv}
          </span>
          <span className="text-[11px] font-medium rounded-full px-2 py-0.5 bg-surface text-foreground border border-line">
            DAZN
          </span>
        </>
      ) : (
        <>
          <span className="text-[11px] font-bold rounded-full px-2 py-0.5 bg-jpnavy/10 text-jpnavy">
            NHK BS4K
          </span>
          <span className="text-[11px] font-medium rounded-full px-2 py-0.5 bg-surface text-foreground border border-line">
            DAZN
          </span>
          <span className="text-[10px] text-muted">（全試合配信）</span>
        </>
      )}
    </div>
  );
}
