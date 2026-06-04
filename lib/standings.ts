import { Match } from "./types";
import { teams } from "@/data/teams";

export interface Row {
  code: string;
  P: number; // 試合数
  W: number;
  D: number;
  L: number;
  GF: number; // 得点
  GA: number; // 失点
  GD: number; // 得失点差
  Pts: number; // 勝点
}

// 完了した試合の結果からグループ順位を計算する。
// 試合前（結果なし）は全チーム0で、実質「組分け表」として表示される。
export function computeStandings(matches: Match[]): Record<string, Row[]> {
  const groups: Record<string, Map<string, Row>> = {};

  // 全48カ国を所属グループに配置（初期値0）
  for (const t of teams) {
    if (!t.group) continue;
    if (!groups[t.group]) groups[t.group] = new Map();
    groups[t.group].set(t.code, {
      code: t.code,
      P: 0,
      W: 0,
      D: 0,
      L: 0,
      GF: 0,
      GA: 0,
      GD: 0,
      Pts: 0,
    });
  }

  // 完了試合を反映（グループステージのみ）
  for (const m of matches) {
    if (m.status !== "FINISHED") continue;
    if (m.homeScore == null || m.awayScore == null) continue;
    const g = m.group;
    if (!g || !groups[g]) continue;
    const home = groups[g].get(m.homeCode);
    const away = groups[g].get(m.awayCode);
    if (!home || !away) continue;

    home.P += 1;
    away.P += 1;
    home.GF += m.homeScore;
    home.GA += m.awayScore;
    away.GF += m.awayScore;
    away.GA += m.homeScore;

    if (m.homeScore > m.awayScore) {
      home.W += 1;
      home.Pts += 3;
      away.L += 1;
    } else if (m.homeScore < m.awayScore) {
      away.W += 1;
      away.Pts += 3;
      home.L += 1;
    } else {
      home.D += 1;
      away.D += 1;
      home.Pts += 1;
      away.Pts += 1;
    }
  }

  // GD算出＋並べ替え（勝点→得失点差→得点）
  const result: Record<string, Row[]> = {};
  for (const [g, map] of Object.entries(groups)) {
    const rows = [...map.values()];
    for (const r of rows) r.GD = r.GF - r.GA;
    rows.sort(
      (a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF || a.code.localeCompare(b.code)
    );
    result[g] = rows;
  }
  return result;
}

// 試合が1つでも完了しているか（順位表が「ライブ」かどうか）
export function hasResults(matches: Match[]): boolean {
  return matches.some((m) => m.status === "FINISHED");
}
