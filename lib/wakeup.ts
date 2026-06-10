// 起きる?寝る?ナビ — 日本時間の生活と試合の価値を秤にかける判定エンジン。
// 「この試合のために目覚ましをかける価値があるか」を5段階で示し、ゲンの一言を添える。

import { Match } from "@/lib/types";
import { getTeam } from "@/data/teams";

export interface WakeVerdict {
  score: 1 | 2 | 3 | 4 | 5; // 観戦価値（時間帯は加味しない純粋な試合価値）
  stars: string;            // "★★★★☆" 形式
  label: string;            // "絶対起きろ" など
  genComment: string;       // ゲンの一言（時間帯を踏まえた助言）
  hardship: "midnight" | "earlymorning" | "daytime" | "evening"; // JST時間帯
}

function jstHour(utcIso: string): number {
  return new Date(new Date(utcIso).getTime() + 9 * 3600 * 1000).getUTCHours();
}

function stageWeight(stage: string): number {
  if (stage.includes("決勝") && !stage.includes("準") && !stage.includes("トーナメント")) return 5;
  if (stage.includes("準決勝")) return 5;
  if (stage.includes("準々決勝")) return 4;
  if (stage.includes("ラウンド16") || stage.includes("ベスト16") || stage.includes("32")) return 3;
  if (stage.includes("3位決定")) return 3;
  return 2; // グループステージ基準値
}

export function judgeWake(match: Match): WakeVerdict {
  const jp = match.homeCode === "JPN" || match.awayCode === "JPN";
  const home = getTeam(match.homeCode);
  const away = getTeam(match.awayCode);

  // 試合価値スコア
  let score: number;
  if (jp) {
    score = 5; // 日本戦は問答無用
  } else {
    score = stageWeight(match.stage);
    const ranks = [home?.fifaRank, away?.fifaRank].filter(
      (r): r is number => typeof r === "number"
    );
    // 強豪対決ボーナス: 両チームがランク12位以内なら+1
    if (ranks.length === 2 && ranks.every((r) => r <= 12)) score += 1;
    // 超強豪（ランク8位以内）が出る試合は+1
    if (ranks.some((r) => r <= 8)) score += 1;
    // 開幕戦は4年に1度の祭りの幕開け
    if (match.id === "m-open") score += 2;
    score = Math.max(1, Math.min(5, score));
  }
  const s = score as WakeVerdict["score"];

  // JST時間帯の区分
  const h = jstHour(match.utcDate);
  const hardship: WakeVerdict["hardship"] =
    h >= 1 && h < 6
      ? "midnight"
      : h >= 6 && h < 10
        ? "earlymorning"
        : h >= 10 && h < 18
          ? "daytime"
          : "evening";

  const stars = "★".repeat(s) + "☆".repeat(5 - s);

  const label =
    s === 5 ? "絶対起きろ" : s === 4 ? "起きる価値あり" : s === 3 ? "余裕があれば" : s === 2 ? "ハイライトで十分" : "結果だけ追え";

  // ゲンの一言: 試合価値 × 時間帯のマトリクスで生成
  let genComment: string;
  if (jp) {
    genComment =
      hardship === "midnight"
        ? "目覚ましは3個かけろ。日本戦を寝過ごした後悔は4年消えない。"
        : hardship === "earlymorning"
          ? "早起きは三文の徳どころじゃない。今日だけは朝活って言い張れ。"
          : "リアルタイムで見られる日本戦だ。仕事も学校も、調整するなら今だぞ。";
  } else if (s >= 5) {
    genComment =
      hardship === "midnight"
        ? "眠いだろうが、この一戦は4年に1度の本物だ。後悔しない方を選べ。"
        : "見逃したら向こう4年、語る側じゃなく聞く側に回ることになるぞ。";
  } else if (s === 4) {
    genComment =
      hardship === "midnight"
        ? "前半だけでも見る価値はある。アラームは消すなよ。"
        : "玄人はこういう試合を拾う。差がつくのはここだ。";
  } else if (s === 3) {
    genComment = "無理して起きる試合じゃない。ただ、波乱の匂いはゼロじゃないけどな。";
  } else {
    genComment = "寝ろ。朝のハイライトとこのアプリで十分追いつける。";
  }

  return { score: s, stars, label, genComment, hardship };
}
