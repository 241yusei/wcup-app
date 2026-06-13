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

// APIの数値IDをシードの "m-xx" 形式に正規化する。
// ストーリー・勝敗予想・観戦メモ・スタンプなど localStorage のキーが
// ライブ/フォールバックで食い違わないようにするための対応表。
const idLookup = new Map<string, { id: string; utcDate: string }[]>();
for (const m of fallbackMatches) {
  const k = pairKey(m.homeCode, m.awayCode);
  if (!idLookup.has(k)) idLookup.set(k, []);
  idLookup.get(k)!.push({ id: m.id, utcDate: m.utcDate });
}

function canonicalId(
  homeCode: string,
  awayCode: string,
  utcDate: string,
  apiId: string
): string {
  const candidates = idLookup.get(pairKey(homeCode, awayCode));
  if (!candidates?.length) return apiId;
  // 同一カードが大会中に複数回ある可能性（決勝Tでの再戦）に備え、日時が最も近いものを採用
  let best = apiId;
  let bestDiff = Infinity;
  for (const c of candidates) {
    const diff = Math.abs(+new Date(c.utcDate) - +new Date(utcDate));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = c.id;
    }
  }
  // 48時間以上ズレていたら別試合とみなしAPIのIDを使う
  return bestDiff < 48 * 3600 * 1000 ? best : apiId;
}

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
          id: canonicalId(homeCode, awayCode, mm.utcDate as string, String(mm.id)),
          utcDate: mm.utcDate as string,
          stage: mapStage(mm.stage as string),
          group:
            typeof mm.group === "string"
              ? mm.group.replace(/^GROUP[_ ]?/i, "")
              : undefined,
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

// 得点ランキング（ゴールデンブーツ）をAPIから取得。
// 環境変数未設定／失敗時は live:false を返し、ページ側はフォールバック表示に切り替える。
const SCORERS_API =
  "https://api.football-data.org/v4/competitions/WC/scorers?limit=20";

export interface LiveScorer {
  player: string;
  teamCode: string;
  goals: number;
  assists?: number;
}

export async function getScorers(): Promise<{
  scorers: LiveScorer[];
  live: boolean;
}> {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) return { scorers: [], live: false };

  try {
    const res = await fetch(SCORERS_API, {
      headers: { "X-Auth-Token": key },
      next: { revalidate: 300 }, // 5分キャッシュ
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const scorers: LiveScorer[] = (data.scorers ?? []).map(
      (s: Record<string, unknown>) => {
        const player = s.player as { name?: string } | undefined;
        const team = s.team as { name?: string } | undefined;
        return {
          player: player?.name ?? "不明",
          teamCode: toCode(team?.name ?? ""),
          goals: (s.goals as number) ?? 0,
          assists:
            typeof s.numberOfAssists === "number"
              ? (s.numberOfAssists as number)
              : undefined,
        };
      }
    );
    return { scorers, live: scorers.length > 0 };
  } catch {
    return { scorers: [], live: false };
  }
}
