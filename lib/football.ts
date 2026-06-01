import { Match } from "./types";
import { fallbackMatches } from "@/data/matches";
import { teams } from "@/data/teams";

// football-data.org のW杯（competition: WC）から日程を取得。
// 環境変数 FOOTBALL_DATA_API_KEY 未設定、または取得失敗時はフォールバックJSONを返す。
// 無料枠（10req/分）対策として ISR（revalidate）でキャッシュする。

const API = "https://api.football-data.org/v4/competitions/WC/matches";

// APIの英語チーム名 → 図鑑のコードへ寄せる簡易マッピング
function toCode(enName: string): string {
  const hit = teams.find(
    (t) => t.enName.toLowerCase() === enName?.toLowerCase()
  );
  return hit?.code ?? enName?.slice(0, 3).toUpperCase() ?? "TBD";
}

// 自前データ（会場込み）を「対戦カード（順不同）」をキーに引けるようにする。
// ライブAPIは時刻は正確だが会場を持たないため、ここから city/stadium を補完する。
function pairKey(a: string, b: string): string {
  return [a, b].sort().join("-");
}
const venueLookup = new Map<
  string,
  { venue: string; city?: string; stadium?: string }
>(
  fallbackMatches
    .filter((m) => m.city || m.stadium)
    .map((m) => [
      pairKey(m.homeCode, m.awayCode),
      { venue: m.venue, city: m.city, stadium: m.stadium },
    ])
);

function mapStage(stage: string): string {
  const m: Record<string, string> = {
    GROUP_STAGE: "グループステージ",
    LAST_32: "ラウンド32",
    LAST_16: "ラウンド16",
    QUARTER_FINALS: "準々決勝",
    SEMI_FINALS: "準決勝",
    FINAL: "決勝",
    THIRD_PLACE: "3位決定戦",
  };
  return m[stage] ?? stage;
}

export async function getMatches(): Promise<{ matches: Match[]; live: boolean }> {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) return { matches: fallbackMatches, live: false };

  try {
    const res = await fetch(API, {
      headers: { "X-Auth-Token": key },
      next: { revalidate: 60 }, // 60秒キャッシュ
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const matches: Match[] = (data.matches ?? []).map(
      (mm: Record<string, unknown>) => {
        const home = mm.homeTeam as { name?: string } | undefined;
        const away = mm.awayTeam as { name?: string } | undefined;
        const score = (mm.score as { fullTime?: { home?: number; away?: number } })
          ?.fullTime;
        const homeCode = toCode(home?.name ?? "");
        const awayCode = toCode(away?.name ?? "");
        const v = venueLookup.get(pairKey(homeCode, awayCode));
        return {
          id: String(mm.id),
          utcDate: mm.utcDate as string,
          stage: mapStage(mm.stage as string),
          group: (mm.group as string) ?? undefined,
          homeCode,
          awayCode,
          venue: v?.venue ?? (mm.venue as string) ?? "",
          city: v?.city,
          stadium: v?.stadium,
          status:
            mm.status === "FINISHED"
              ? "FINISHED"
              : mm.status === "IN_PLAY" || mm.status === "PAUSED"
                ? "LIVE"
                : "SCHEDULED",
          homeScore: score?.home ?? undefined,
          awayScore: score?.away ?? undefined,
        } as Match;
      }
    );
    if (!matches.length) return { matches: fallbackMatches, live: false };
    return { matches, live: true };
  } catch {
    return { matches: fallbackMatches, live: false };
  }
}
