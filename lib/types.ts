export type TeamCode = string;

export interface Player {
  name: string;
  position: string;
  club: string;
  why: string; // にわか向け「ここが見どころ」
}

// 観戦前ブリーフィング（「試合前にこれだけは知っておくべき◯つのこと」）
export interface BriefingItem {
  icon: string; // 絵文字
  label: string; // カテゴリ（直近の状況 / 国情・カルチャー など）
  title: string; // 短い見出し
  body: string; // 本文（自前要約）
}

export interface Team {
  code: TeamCode; // ISO風2-3文字
  name: string; // 日本語表記
  enName: string;
  flag: string; // 絵文字国旗
  group: string;
  fifaRank?: number;
  themeColor: string; // 各国テーマカラー（hex）
  nickname: string; // 愛称（例：サムライブルー）
  tactics: string; // 戦術の特徴
  recent: string; // 直近の状況変化・ニュース
  players: Player[]; // 注目選手
  trivia: string[]; // サッカー外の小ネタ
  whyWatch?: string; // この国を観るべき理由の一言フック
  briefing?: BriefingItem[]; // 観戦前ブリーフィング
}

export interface Match {
  id: string;
  utcDate: string; // ISO8601 UTC
  stage: string; // グループステージ / ラウンド16 など
  group?: string;
  homeCode: TeamCode;
  awayCode: TeamCode;
  venue: string; // 後方互換用の表示文字列（都市など）
  city?: string; // 開催都市・地域（例：シアトル）
  stadium?: string; // スタジアム正式名称（例：ルーメン・フィールド）
  status: "SCHEDULED" | "LIVE" | "FINISHED";
  homeScore?: number;
  awayScore?: number;
  extraTime?: boolean; // 延長戦にもつれた試合
  pkHome?: number; // PK戦（あれば）
  pkAway?: number;
}

export interface NewsItem {
  id: string;
  category: "serious" | "fun"; // 真面目 / 面白
  title: string;
  summary: string; // 自前要約（全文転載しない）
  sourceName: string;
  sourceUrl: string;
  date: string; // YYYY-MM-DD
  tag?: string;
}
