import { Match } from "./types";
import { getTeam } from "@/data/teams";

export interface WatchScore {
  total: number; // 0-100 見るべき度
  drama: number; // ドラマ度
  upset: number; // 番狂わせ期待度
  reason: string; // にわか向け一言
  jpInvolved: boolean;
}

// 注: includes判定のため、より限定的な語（準々決勝・準決勝）を先に並べる
const STAGE_WEIGHT: [string, number][] = [
  ["準々決勝", 28],
  ["準決勝", 34],
  ["決勝", 40],
  ["ラウンド16", 24],
  ["ラウンド32", 20],
  ["第3節", 18],
  ["グループステージ", 12],
];

export function scoreMatch(m: Match): WatchScore {
  const home = getTeam(m.homeCode);
  const away = getTeam(m.awayCode);
  const jpInvolved = m.homeCode === "JPN" || m.awayCode === "JPN";

  const stageBase = STAGE_WEIGHT.find(([k]) => m.stage.includes(k))?.[1] ?? 10;

  // ランク差が大きいほど「番狂わせ」の期待値が上がる
  const r1 = home?.fifaRank ?? 30;
  const r2 = away?.fifaRank ?? 30;
  const rankGap = Math.abs(r1 - r2);
  const upset = Math.min(40, rankGap * 2.5);

  // 強豪同士はドラマ度が高い
  const strength = 60 - Math.min(r1, 30) - Math.min(r2, 30) / 2;
  const drama = Math.max(0, Math.min(40, strength));

  let total = stageBase + drama + upset / 2;
  let reason = "好カード。見て損なし。";

  if (jpInvolved) {
    total += 25;
    reason = "日本戦。これは見るしかない。";
  } else if (upset >= 25) {
    reason = "格下が大物を食う『ジャイキリ』の予感。";
  } else if (drama >= 30) {
    reason = "優勝候補同士のガチンコ。ハズレなし。";
  } else if (m.stage === "決勝") {
    reason = "頂上決戦。4年に一度の最高の夜。";
  }

  return {
    total: Math.round(Math.min(100, total)),
    drama: Math.round(drama),
    upset: Math.round(upset),
    reason,
    jpInvolved,
  };
}
